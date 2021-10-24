import { NextFunction, Request, Response } from "express";
const models = require("../../models");

type CommentModel = {
    readonly id: number,
    content: string,
    readonly userId: number,
    readonly postId: number,
    createdAt: string,
    updatedAt: string
} & MethodsModel;

type MethodsModel = {
    create<T>(data: CommentProperties): Promise<T>;
}

type CommentProperties = {
    content: CommentModel['content'],
    UserId: CommentModel['userId'],
    PostId: CommentModel['postId']
}

class CommentController {

    commentModel: CommentModel;

    constructor(commentModel: CommentModel) {
        this.commentModel = commentModel;
    }
    
    /**
     * Create a comment for one post
     * @memberof CommentController
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const commentProp: CommentProperties = {
            content: req.body.content,
            UserId: req.body.userId,
            PostId: req.body.postId
        }

        try {
            const newComment = await this.commentModel.create<CommentModel>(commentProp);
            res.status(201).json(newComment);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

const commentController = new CommentController(models.Comment);

export default commentController;