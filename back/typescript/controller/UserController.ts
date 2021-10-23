import { NextFunction, Request, Response } from "express";
const models = require('../../models');

type User = {
    "uuid": string,
    "id": number,
    "email": string,
    "password": string,
    "username": string,
    "isAdmin": true,
    "businessRole": string,
    "updatedAt": string,
    "createdAt": string
} & MethodsModels

type MethodsModels = {
    create<T>(data: unknown): T
}

class UserController {

    private user: User;

    constructor(user: User) { 
        this.user = user;
    }
    
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = await this.user.create<User>({ ...req.body });
            res.status(201).json(newUser);
        } catch (err: any) {
            res.status(500).json({ err: err.message });
        }
    }
}

const userController = new UserController(models.User);

export default userController;