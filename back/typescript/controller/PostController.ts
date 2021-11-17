import { NextFunction, Request, Response } from "express";
import type { Post, Category, User, Comment, Reaction } from "../type/allTypes";
import authInstance from '../middleware/Auth';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
// import commonJS: in JS (sequelize models) (TS in allow JS)
const models = require("../../models");

dotenv.config();

class PostController {

	private postModel: Post;
	private categoryModel: Category;
	private userModel: User;
	private commentModel: Comment;
	private reactionModel: Reaction;
	private messages: {
		readonly noPost: string,
		readonly postDeleted: string,
		readonly postNotDeleted: string,
		readonly notFound: string,
		readonly modified: string,
		readonly notAutho: string,
		readonly infoNotFound: string
	}

	constructor(postModel: Post, categoryModel: Category,
		userModel: User, commentModel: Comment, reactionModel: Reaction) {
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
	 * Erase img according to destImages path
	 * @memberof PostController
	 */
	private eraseImage(post: Post, destImages: string) {
		const fileName = post.attachment.split(`/${destImages}/`)[1];
		fs.unlink(`${destImages}/${fileName}`, (err: any )=> {
			if (err) throw err;
		});
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
			console.log(req.body);
			const data = {
				attachment: imageUrl,
				content: req.body.content,
				UserId: tokenPayload.userId,
				category_name: req.body.category
			}
			// create post & find or create the category
			const newPost = await this.postModel.create<Post>(data);
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
			const posts = await this.postModel.findAll<Post>({
				order: [
					["id", "DESC"]
				],
				include: [
					{
						model: this.userModel,
						attributes: ['username']
					},
					{
						model: this.commentModel
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
	 * Get all postsper category with associations
	 * @memberof PostController
	 */
	public async getAllPerCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const posts = await this.postModel.findAll<Post>({
				where: { category_name: req.params.category_name },
				order: [
					["id", "DESC"]
				],
				include: [
					{
						model: this.userModel,
						attributes: ['username']
					},
					{
						model: this.commentModel
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
			const post = await this.postModel.findOne<Post>({
				where: { id: req.params.id }
			});
			if (!post) {
				res.status(404).json({ message: this.messages.notFound });
				return;
			}

			// ckeck if it is the author of the message 
			if (post.UserId === tokenPayload.userId) {
				// if file, delete old img if exist and create new path to img
				let destImages: undefined | string;
				let imageUrl: undefined | string;
				if (req.file) {
					destImages = process.env.DEST_POSTS_ATTACHMENTS ?? "posts_attachments";
					if (post.attachment) {
						this.eraseImage(post, destImages);					
					}
					imageUrl = `${req.protocol}://${req.get('host')}/${destImages}/${req.file.filename}`;
				}
				post.attachment = imageUrl ?? "";
				post.content = req.body.content ? req.body.content : post.content;
				// save new data
				const newPost = await post.save<Post>();
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
			const post = await this.postModel.findOne<Post>({
				where: {id: req.params.id}
			})
			if (!post) {
				res.status(404).json({ message: this.messages.noPost });
				return;
			}

			// ckeck if it is the author || admin user
			if ((post.UserId === tokenPayload.userId) || tokenPayload.isAdmin) {
				// if img, delete img
				let destImages: undefined | string;
				if (post.attachment) {
					destImages = process.env.DEST_POSTS_ATTACHMENTS ?? "post_attachments";
					this.eraseImage(post, destImages);
				}
				// del post
				const deletedPost = await post.destroy<Post>();
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