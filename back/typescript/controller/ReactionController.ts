import { NextFunction, Request, Response } from "express";
const models = require("../../models");

class ReactionController {
    constructor() { }
    
    /**
     * Create one reaction for a post
     * @memberof ReactionController
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {

    }
}

const reactionController = new ReactionController();

export default reactionController;