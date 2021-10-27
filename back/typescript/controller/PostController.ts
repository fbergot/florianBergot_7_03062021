import { NextFunction, Request, Response } from "express";
const models = require("../../models");

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
	save(): any
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

	postModel: PostModel;
	categoryModel: CatModel;
	userModel: UserModel;
	commentModel: CommentModel;
	reactionModel: ReactionModel;
	messages: {
		noPost: string,
		postDeleted: string,
		postNotDeleted: string,
		notFound: string,
		modified: string,
		notAutho: string
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
			notAutho: 'Modification not authorized'
		}
	}

	/**
	 * Create a post with category
	 * @memberof PostController
	 */
	public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		// body.userId per Auth
		try {
			const data = {
				title: req.body.title,
				content: req.body.content,
				UserId: req.body.userId,
				category: req.body.category
			}
			const newPost = await this.postModel.create<PostModel>(data);
			const categoryOfPost = await this.categoryModel.findOrCreate<CatModel>({
				where: { name: req.body.category },
				default: {
					name: req.body.category
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
			const post = await this.postModel.findOne<PostModel>({
				where: { id: req.params.id }
			});
			if (!post) {
				res.status(404).json({ message: this.messages.notFound });
				return;
			}
			// control 
			if (post.UserId === req.body.userId) {
				post.content = req.body.content;
				const newPost = await post.save();
				res.status(200).json({ message: this.messages.modified, info: newPost });
				return;
			}
			res.status(401).json({ message: this.messages.notAutho });
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
			const post = await this.postModel.findOne<PostModel>({
				where: {id: req.params.id}
			})
			if (!post) {
				res.status(404).json({ message: this.messages.noPost });
				return;
			}
			if (post.UserId === req.body.userId || req.body.isAdmin) {
				const deletedPost = await post.destroy<PostModel>();
				res.status(200).json({ message: this.messages.postDeleted, info: { idPostDeleted: deletedPost.id } });
			} else {
				res.status(403).json({ error: this.messages.postNotDeleted });
			}
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