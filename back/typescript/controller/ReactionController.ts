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
			if (!post) {
				res.status(404).json({ message: this.messages.postNotFound });
				return;
			}

			if (post.Reactions.length !== 0) {
				const userOldReaction = post.Reactions.find((reaction: {userId: number}) => {
					return reaction.userId === tokenPayload.userId;
				})

				if (userOldReaction) {
					// if old reaction, update
					let idReaction = userOldReaction.id;
					const oldReaction = await this.reactionModel.findOne<Reaction>({
						where: {id: idReaction}
					})

					if (oldReaction) {
						switch (oldReaction.likeOrDislike) {
							case "like":
								if (req.body.likeOrDislike === 'like') {
									res.status(409).json({ message: this.messages.alreadyLiked });
									return;
								} else if (req.body.likeOrDislike === 'dislike') {
									const oldReactionPost = await this.reactionPostModel.findOne({
										where: {postId: post.id, reactionId: idReaction}
									})
									await oldReactionPost.destroy();
									await oldReaction.destroy<Reaction>();
									res.status(200).json({ message: this.messages.delLiked });
									return;
								}
								break;					
							case 'dislike':
								if (req.body.likeOrDislike === 'dislike') {
									res.status(409).json({ message: this.messages.alreadyDisliked });
									return;
								} else if (req.body.likeOrDislike === 'like') {
									const oldReactionPost = await this.reactionPostModel.findOne({
										where: {postId: post.id, reactionId: idReaction}
									})
									await oldReactionPost.destroy();
									await oldReaction.destroy<Reaction>();
									res.status(200).json({ message: this.messages.delDislike });
									return;
								}										
						}
					} else {
						res.status(404).json({ error: "Old reaction missing" });
					}
				} else {
					// if not old reaction, add new reaction
					const newReaction = await this.reactionModel.create<Reaction>({
						UserId: tokenPayload.userId,
						likeOrDislike: req.body.likeOrDislike
					})
					const $React = await post.addReaction<Reaction>(newReaction);
					res.status(201).json($React);
				}
			} else {
				// if not old reaction, add new reaction
				const newReaction = await this.reactionModel.create<Reaction>({
					UserId: tokenPayload.userId,
					likeOrDislike: req.body.likeOrDislike
				})
				const $React = await post.addReaction<Reaction>(newReaction);
				res.status(201).json($React);				
			}
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	/**
	 * Get reactions for a post
	 * @memberof ReactionController
	 */
	public async getReactionsOfPost(req: Request, res: Response, next: NextFunction) {
		try {
			const postWithReaction = await this.postModel.findOne<Post>({
				where: { id: req.params.postId },
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

const reactionController = new ReactionController(models.Reaction, models.Post, models.ReactionPost);

export default reactionController;