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

type MethodsModel = {
	create<T>(data: PostModelData): Promise<T>
}

type PostModelData = {
	content: PostModel['content'],
	UserId: PostModel['userId'],
	attachment?: PostModel['attachment']
}

class PostController {

	postModel: PostModel;

	constructor(postModel: PostModel) {
		this.postModel = postModel;
	}

	/**
	 * Create a post
	 * @memberof PostController
	 */
	public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const newMessage = await this.postModel.create<PostModel>({ ...req.body });
			res.status(201).json(newMessage);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}

const postController = new PostController(models.Post);

export default postController;