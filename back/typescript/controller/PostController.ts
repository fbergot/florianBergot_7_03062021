import { NextFunction, Request, Response } from "express";
const models = require("../../models");

type PostModel = {
	readonly id: number,
	content: string,
	readonly userId: number,
	attachment?: string,
	createdAt: string,
	updatedAt: string,
} & MethodsModel;

type PostModelData = {
	content: PostModel['content'],
	UserId: PostModel['userId'],
	attachment?: PostModel['attachment']
}

type MethodsModel = {
	create<T>(data: PostModelData): Promise<T>;
	findOne<T>(data: any): Promise<T>;
	addCategory(data: any): Promise<any>;
	findAll(options: {
		include: {}[]
	}): Promise<any>
}

type CatModel = {
	readonly id: number,
	name: string,
	createdAt: string,
	updatedAt: string
} & MethodsModel;

type UserModel = {
readonly uuid: string,
readonly id: number,
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

	constructor(postModel: PostModel, categoryModel: CatModel,
		userModel: UserModel, commentModel: CommentModel, reactionModel: ReactionModel) {
		this.postModel = postModel;
		this.categoryModel = categoryModel;
		this.userModel = userModel;
		this.commentModel = commentModel;
		this.reactionModel = reactionModel;
	}

	/**
	 * Create a post
	 * @memberof PostController
	 */
	public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const newPost = await this.postModel.create<PostModel>({ ...req.body });
			const categoryOfPost = await this.categoryModel.findOne({
				where: { id: req.body.category }
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
			const posts = await this.postModel.findAll({
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
}

const postController = new PostController(
	models.Post,
	models.Category,
	models.User,
	models.Comment,
	models.Reaction
);

export default postController;