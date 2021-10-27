import { NextFunction, Request, Response } from "express";
const models = require("../../models");

type CommentModel = {
    id: number,
    content: string,
    UserId: number,
    PostId: number,
    createdAt: string,
    updatedAt: string
} & MethodsModel;

type MethodsModel = {
    create<T>(data: CommentProperties): Promise<T>;
    findOne<T>(options: any): Promise<T | null>;
    destroy<T>(): Promise<T>;
}

type CommentProperties = {
    content: CommentModel['content'],
    UserId: CommentModel['UserId'],
    PostId: CommentModel['PostId']
}

class CommentController {

    commentModel: CommentModel;
    messages: {
        notFound: string;
        comDeleted: string;
        comNotDeleted: string;
    }

    constructor(commentModel: CommentModel) {
		this.commentModel = commentModel;
		this.messages = {
			notFound: "Comment not found",
			comDeleted: "Comment deleted",
			comNotDeleted: "Comment not deleted"
		}
    }
    
    /**
     * Create a comment for one post
     * @memberof CommentController
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		const commentProp: CommentProperties = {
			content: req.body.content,
			UserId: req.body.userId,
			PostId: parseInt(req.params.postId)
		}

		try {
			const newComment = await this.commentModel.create<CommentModel>(commentProp);
			res.status(201).json(newComment);
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
            const comment = await this.commentModel.findOne<CommentModel>({
                where: { id: req.params.commentId }
			});
			
            if (!comment) {
                res.status(404).json({ message: this.messages.notFound });
                return;
			}
			
            if (comment.UserId === req.body.userId || req.body.isAdmin) {
				const deletedComment = await comment.destroy<CommentModel>();
				res.status(200).json({ message: this.messages.comDeleted, info: { idComDeleted: deletedComment.id } });
			} else {
				res.status(401).json({ error: this.messages.comNotDeleted });
			}
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

const commentController = new CommentController(models.Comment);

export default commentController;