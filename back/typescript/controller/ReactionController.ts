import { NextFunction, Request, Response } from "express";
import type { Post, Reaction } from "../type/allTypes";
import authInstance from "../middleware/Auth";
// import commonJS: in JS (sequelize models) (TS in allow JS)
const models = require("../../models");

type ReactionType = {
	userId: number;
	likeOrDislike: string;
}

class ReactionController {

	private reactionModel: Reaction;
	private postModel: Post;
	private reactionPostModel: any;
	private messages: {
		readonly alreadyLiked: string;
		readonly alreadyDisliked: string;
		readonly delDislike: string;
		readonly delLiked: string;
		readonly badKey: string;
		readonly postNotFound: string;
	}

	constructor(reactionModel: Reaction, postModel: Post, reactionPostModel: any) { 
		this.reactionModel = reactionModel;
		this.postModel = postModel;
		this.reactionPostModel = reactionPostModel;
		this.messages = {
			alreadyLiked : "User already liked",
			alreadyDisliked: "User already disliked",
			delDislike: 'Dislike deleted',
			delLiked: "Like deleted",
			badKey: "Bad key (accepted: like/dislike)",
			postNotFound: "Post not found"
		}
	}

	/**
	 * Analyse reaction and state of old reaction (if exist) 
	 * @memberof ReactionController
	 */
	private async analyseReaction(oldReaction: Reaction | null, likeOrDislike: string, res: Response) {
		if (oldReaction) {
			switch (likeOrDislike) {
				case "like":
					if (oldReaction.likeOrDislike === 'like') {
						res.status(409).json({ message: this.messages.alreadyLiked });
						return true;
					} else if (oldReaction.likeOrDislike === 'dislike') {
						await oldReaction.destroy<Reaction>();
						res.status(200).json({ message: this.messages.delDislike });
						return true;
					}
					break;					
				case 'dislike':
					if (oldReaction.likeOrDislike === 'dislike') {
						res.status(409).json({ message: this.messages.alreadyDisliked });
						return true;
					} else if (oldReaction.likeOrDislike === 'like') {
						await oldReaction.destroy<Reaction>();
						res.status(200).json({ message: this.messages.delLiked });
						return true;
					}										
			}
		}
		return undefined;
	}
    
    /**
     * Create one reaction for a post
     * @memberof ReactionController
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (req.body.likeOrDislike !== "like" && req.body.likeOrDislike !== "dislike") {
				res.status(400).json({ message: this.messages.badKey });
				return;	
			}			
			// get userInfo
			const tokenPayload = await authInstance.getTokenInfo(req);
			// find the post for add reaction			 
			const post = await this.postModel.findOne<Post>({
				where: { id: req.params.postId },
				include: [
					{
						model: this.reactionModel
					}
				]
			})
			console.log(post);
			if (!post) {
				res.status(404).json({ message: this.messages.postNotFound });
				return;
			}
			// check if already liked/disliked
			const oldReaction = await this.reactionModel.findOne<Reaction>({
				where: {userId: tokenPayload.userId}
			})
			// if old reaction, analyse 
			const state = await this.analyseReaction(oldReaction, req.body.likeOrDislike, res);
			if (state) return;
			// if not old reaction, create & add new reaction
			const newReaction = await this.reactionModel.create<Reaction>({
				UserId: tokenPayload.userId,
				likeOrDislike: req.body.likeOrDislike
			})
			const $React = await post.addReaction<Reaction>(newReaction);
			res.status(201).json($React);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	public async getReactionsOfPost(req: Request, res: Response, next: NextFunction) {
		try {
			const postWithReaction = await this.postModel.findOne<Post>({
				where: {id: req.params.postId},
				include: [
					{
						model: this.reactionModel
					}
				]
			})
	
			if (postWithReaction) {
				res.status(200).json(postWithReaction);
			} else {
				res.status(404).json({ message: 'No post with this id', postWithReaction: postWithReaction });
			}

		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}

const reactionController = new ReactionController(models.Reaction, models.Post, models.reactionPost);

export default reactionController;