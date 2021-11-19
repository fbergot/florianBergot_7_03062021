import { NextFunction, Request, Response } from "express";
import type { Comment, CommentProperties} from "../type/allTypes";
import authInstance from '../middleware/Auth';
// import commonJS: in JS (sequelize models) (TS in allow JS)
const models = require("../../models");

class CommentController {
    private commentModel: Comment;
    private userModel: any;
    private messages: {
        readonly notFound: string;
        readonly comDeleted: string;
        readonly comNotDeleted: string;
        readonly infoNotFound: string
    }

    constructor(commentModel: Comment, userModel: any) {
		this.commentModel = commentModel;
        this.userModel = userModel;
		this.messages = {
			notFound: "Comment not found",
			comDeleted: "Comment deleted",
            comNotDeleted: "Comment not deleted",
            infoNotFound: "Info user not found in token"
		}
    }
    
    /**
     * Create a comment for one post
     * @memberof CommentController
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {       
        try {
            // get userInfo
            const tokenPayload = await authInstance.getTokenInfo(req);
            const commentProp: CommentProperties = {
                content: req.body.content,
                UserId: tokenPayload.userId,
                PostId: parseInt(req.params.postId)
            }
            const newComment = await this.commentModel.create<Comment>(commentProp);
			res.status(201).json(newComment);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
    }
    
    /**
     * Get all comments per post
     * @memberof CommentController
     */
    public async getAllPerPost(req: Request, res: Response, next: NextFunction): Promise<void> {       
        try {
            const comments = await this.commentModel.findAll<Comment[]>({
                where: { postId: req.params.postId },
                order: [
                    ['createdAt', "DESC"]
                ],
                include: [
                    {
                        model: this.userModel
                    }
                ]
            });
			res.status(200).json(comments);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
	

    /**
	 * Delete one comment
	 * @memberof CommentController
	 */
	public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // get userInfo
            const tokenPayload = await authInstance.getTokenInfo(req);
            // find comment to delete
            const comment = await this.commentModel.findOne<Comment>({
                where: { id: req.params.commentId }
			});
			
            if (!comment) {
                res.status(404).json({ message: this.messages.notFound });
                return;
			}
			
            if (comment.UserId === tokenPayload.userId || tokenPayload.isAdmin) {
				const deletedComment = await comment.destroy<Comment>();
				res.status(200).json({ message: this.messages.comDeleted, info: { idComDeleted: deletedComment.id } });
			}
            res.status(403).json({ error: this.messages.comNotDeleted });			
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

const commentController = new CommentController(models.Comment, models.User);

export default commentController;