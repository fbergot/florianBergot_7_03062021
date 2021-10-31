import { NextFunction, Request, Response } from "express";
import authInstance from '../middleware/Auth';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const models = require("../../models");

dotenv.config();


type PostModel = {
	id: number,
	content: string,
	UserId: number,
	attachment?: string,
	createdAt: string,
	updatedAt: string,
} & MethodsModel;

type PostModelData = {
	content: PostModel['content'],
	UserId: PostModel['UserId'],
	attachment?: PostModel['attachment']
}

type MethodsModel = {
	create<T>(data: PostModelData): Promise<T>;
	findOne<T>(data: any): Promise<T | null>;
	addCategory(data: any): Promise<any>;
	findAll<T>(options: { include: {}[] }): Promise<T[] | null>;
	findOrCreate<T>(data: any): Promise<T>;
	destroy<T>(): Promise<T>;
	save<T>(): Promise<T>;
};

type CatModel = {
	id: number,
	name: string,
	createdAt: string,
	updatedAt: string
} & MethodsModel;

type UserModel = {
	uuid: string,
	id: number,
	email: string,
	password: string,
	username: string,
	isAdmin: boolean,
	businessRole: string,
	updatedAt: string,
	createdAt: string
}

type CommentModel = {
	id: number,
	constent: string,
	userId: number,
	postId: number,
	createdAt: string,
	updatedAt: string
}

type ReactionModel = {
	id: number,
	userId: number,
	likeOrDislike: string,
	createdAt: string,
	updatedAt: string
}

class PostController {

	private postModel: PostModel;
	private categoryModel: CatModel;
	private userModel: UserModel;
	private commentModel: CommentModel;
	private reactionModel: ReactionModel;
	private messages: {
		readonly noPost: string,
		readonly postDeleted: string,
		readonly postNotDeleted: string,
		readonly notFound: string,
		readonly modified: string,
		readonly notAutho: string,
		readonly infoNotFound: string
	}

	constructor(postModel: PostModel, categoryModel: CatModel,
		userModel: UserModel, commentModel: CommentModel, reactionModel: ReactionModel) {
		this.postModel = postModel;
		this.categoryModel = categoryModel;
		this.userModel = userModel;
		this.commentModel = commentModel;
		this.reactionModel = reactionModel;
		this.messages = {
			noPost: "Not post with this id",
			postDeleted: "Post deleted",
			postNotDeleted: 'Cannot delete this post, requires elevation of privilege',
			notFound: "Post not found",
			modified: "Post modified",
			notAutho: 'Modification not authorized',
			infoNotFound: "Info user not found in token"
		}
	}

	/**
	 * Create a post with category
	 * @memberof PostController
	 */
	public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// get user info
			const tokenPayload = await authInstance.getTokenInfo(req);
			let destImages: undefined | string;
			let imageUrl: undefined | string;
			if (req.file) {
				destImages = process.env.DEST_POSTS_ATTACHMENTS ?? "posts_attachments";
				imageUrl = `${req.protocol}://${req.get('host')}/${destImages}/${req.file.filename}`;				
			}
			const data = {
				urlAvatar: imageUrl,
				content: req.body.content,
				UserId: tokenPayload.userId,
				category: req.body.category
			}
			// create post & find or create the category
			const newPost = await this.postModel.create<PostModel>(data);
			const categoryOfPost = await this.categoryModel.findOrCreate<CatModel>({
				where: { name: req.body.category },
				default: {
					name: req.body.category || 'divers'
				}
			});
			await newPost.addCategory(categoryOfPost);
			res.status(201).json(newPost);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	/**
	 * Get all posts with associations
	 * @memberof PostController
	 */
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const posts = await this.postModel.findAll<PostModel>({
				include: [
					{
						model: this.userModel,
						attributes: ['username']
					},
					{
						model: this.commentModel
					},
					{
						model: this.categoryModel,
						attributes: ['name']
					},
					{
						model: this.reactionModel,
					}
				]
			});
			res.status(200).json(posts);
		} catch (err: any) {
			res.status(500).json({ error: err.messge });
		}
	}

	/**
	 * Update one message
	 * @memberof PostController
	 */
	public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// get userInfo
			const tokenPayload = await authInstance.getTokenInfo(req);
			// find the post to update
			const post = await this.postModel.findOne<PostModel>({
				where: { id: req.params.id }
			});
			if (!post) {
				res.status(404).json({ message: this.messages.notFound });
				return;
			}

			// if file, delete old img if exist and create new path to img
			let destImages: undefined | string;
			let imageUrl: undefined | string;
			if (req.file) {
				destImages = process.env.DEST_POSTS_ATTACHMENTS ?? "posts_attachments";
				if (post.attachment) {
					const fileName = post.attachment.split(`/${destImages}/`)[1];
					fs.unlink(`${destImages}/${fileName}`, (err: any )=> {
						if (err) throw err;
					});					
				}
				imageUrl = `${req.protocol}://${req.get('host')}/${destImages}/${req.file.filename}`;
			}
			// ckeck if it is the author of the message 
			if (post.UserId === tokenPayload.userId) {
				post.attachment = imageUrl;
				post.content = req.body.content;
				// save new data
				const newPost = await post.save<PostModel>();
				res.status(200).json({ message: this.messages.modified, info: newPost });
				return;
			}
			res.status(403).json({ message: this.messages.notAutho });				
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	/**
	 * Delete one post
	 * @memberof PostController
	 */
	public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// get userInfo
			const tokenPayload = await authInstance.getTokenInfo(req);
			// find the post to delete
			const post = await this.postModel.findOne<PostModel>({
				where: {id: req.params.id}
			})
			if (!post) {
				res.status(404).json({ message: this.messages.noPost });
				return;
			}

			// ckeck if it is the user || ckeck if is admin user
			if ((post.UserId === tokenPayload.userId) || tokenPayload.isAdmin) {
				// if img, delete image
				let destImages: undefined | string;
				if (post.attachment) {
					destImages = process.env.DEST_POSTS_ATTACHMENTS ?? "post_attachments";
					const fileName = post.attachment.split(`/${destImages}/`)[1];
					fs.unlink(`${destImages}/${fileName}`, (err: any) => {
						if (err) throw err;
					})
				}
				// del post
				const deletedPost = await post.destroy<PostModel>();
				res.status(200).json({ message: this.messages.postDeleted, info: { idPostDeleted: deletedPost.id } });
				return;
			}
			res.status(403).json({ error: this.messages.postNotDeleted });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}		
	}
}

const postController = new PostController(
	models.Post,
	models.Category,
	models.User,
	models.Comment,
	models.Reaction
);

export default postController;