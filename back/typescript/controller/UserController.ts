import { NextFunction, Request, Response } from "express";
import {bcryptInstance, Bcrypt} from '../class/Bcrypt';
const models = require('../../models');

type User = {
    "uuid": string,
    "id": number,
    "email": string,
    "password": string,
    "username": string,
    "isAdmin": boolean,
    "businessRole": string,
    "updatedAt": string,
    "createdAt": string
} & MethodsModels

type MethodsModels = {
    create<T>(data: unknown): Promise<T>
}

class UserController {

    private user: User;
    private bcryptInst: Bcrypt;

    constructor(user: User, bcryptInst: Bcrypt) { 
        this.user = user;
        this.bcryptInst = bcryptInst;
    }
    
    /**
     * Register a user
     * @memberof UserController
     */
    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { password } = req.body;
            const salt = Number.parseInt(process.env.SALT ?? "10");
            const hashPassord = await this.bcryptInst.bcryptHash(password, salt);
            const newUser = await this.user.create<User>({ ...req.body, password: hashPassord });            
            res.status(201).json(newUser);
        } catch (err: any) {
            res.status(500).json({ err: err.message });
        }
    }
}

const userController = new UserController(models.User, bcryptInstance);

export default userController;