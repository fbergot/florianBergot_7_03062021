import { NextFunction, Request, Response } from "express";
import authInstance from "../middleware/Auth";
const models = require("../../models");

type Reaction = {
	id: number;
	UserId: number;
	likeOrDislike: string;
	createdAt: string;
	updatedAt: string;
} & MethodModel;

type Post = {
	id: number,
	content: string,
	UserId: number,
	attachment?: string,
	createdAt: string,
	updatedAt: string,
} & {
	findOne<T>(data: any): Promise<T | null>;
	addReaction<T>(reaction: Reaction): Promise<T>;
}

type MethodModel = {
	create<T>(data: any): Promise<T>;
	findOne<T>(data: any): Promise<T | null>;
	destroy<T>(): Promise<T>;
}

class ReactionController {

	reactionModel: Reaction;
	postModel: Post;

	constructor(reactionModel: Reaction, postModel: Post) { 
		this.reactionModel = reactionModel;
		this.postModel = postModel;
	}
    
    /**
     * Create one reaction for a post
     * @memberof ReactionController
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (req.body.likeOrDislike !== "like" && req.body.likeOrDislike !== "dislike") {
				res.status(400).json({ message: `Bad key (accepted: like/dislike) given: ${req.body.likeOrDislike}` });
				return;	
			}
			
			// get userInfo
			const tokenPayload = await authInstance.getTokenInfo(req);
			// check if already liked/disliked
			const oldReaction = await this.reactionModel.findOne<Reaction>({
				where: {userId: tokenPayload.userId}
			})

			if (oldReaction) {
				switch (req.body.likeOrDislike) {
					case "like":
						if (oldReaction.likeOrDislike === 'like') {
							res.status(409).json({ message: "User already liked" });
							return;
						} else if (oldReaction.likeOrDislike === 'dislike') {
							await oldReaction.destroy<Reaction>();
							res.status(200).json({ message: 'Dislike deleted' });
							return;
						}
						break;					
					case 'dislike':
						if (oldReaction.likeOrDislike === 'dislike') {
							res.status(409).json({ message: "User already disliked" });
							return;
						} else if (oldReaction.likeOrDislike === 'like') {
							await oldReaction.destroy<Reaction>();
							res.status(200).json({ message: 'Like deleted' });
							return;
						}										
				}
			}

			const newReaction = await this.reactionModel.create<Reaction>({
				UserId: tokenPayload.userId,
				likeOrDislike: req.body.likeOrDislike
			})
			// find the post for add reaction			 
			const post = await this.postModel.findOne<Post>({
				where: {id: req.params.postId}
			})
			if (!post) {
				res.status(404).json({ message: "Post not found" });
				return;
			}
			// add 
			const $React = await post.addReaction<Reaction>(newReaction);
			res.status(201).json($React);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}

const reactionController = new ReactionController(models.Reaction, models.Post);

export default reactionController;