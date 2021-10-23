import { NextFunction, Request, Response } from "express";
import {bcryptInstance, Bcrypt} from '../class/Bcrypt';
import {jwtInstance, JSONWebToken} from '../class/Jwt';
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
    create<T>(data: {
        [key in keyof T]: T[key]
    }
    ): Promise<T>;
    findOne<T>(data: {
        where: {}
    }): Promise<T>
}

class UserController {

    private user: User;
    private bcryptInst: Bcrypt;
    private jwtInst: JSONWebToken;
    private messages: {
        badPass: string,
        userNotExist: string
    }

    constructor(user: User, bcryptInst: Bcrypt, jwt: JSONWebToken) { 
        this.user = user;
        this.bcryptInst = bcryptInst;
        this.jwtInst = jwt;
        this.messages = {
            badPass: "Bad password",
            userNotExist: 'User not exist, please signup'

        }
    }
    
    /**
     * Register an user
     * @memberof UserController
     */
    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            // --- hash user password and create user in DB ---
            const salt = Number.parseInt(process.env.SALT ?? "10");
            const password = req.body.password;
            const hashPassord = await this.bcryptInst.bcryptHash(password, salt);
            const newUser = await this.user.create<User>({ ...req.body, password: hashPassord });            
            res.status(201).json(newUser);
        } catch (err: any) {
            res.status(500).json({ err: err.message });
        }
    }

    /**
     * Signin an user
     * @memberof UserController
     */
    public async signin(req: Request, res: Response, next: NextFunction) {
        let user;
        // --- find if user exist with his email --- 
        try {           
            user = await this.user.findOne<User>({
                where: {email: req.body.email}
            });
            if (!user) {
                res.status(404).json({ error: this.messages.userNotExist });
                return;
            }
        } catch (err: any) {
            res.status(500).json({ err: err.message });
        }
        // --- compare password & create jwt if password is correct
        try {
            if (!await this.bcryptInst.bcryptCompare(req.body.password, user.password)) {
                console.log(user);
                res.status(401).json({ error: this.messages.badPass });
                return;
            }
            const secret = process.env.SECRET ?? "secret";
            const options = { expiresIn: '2h' };
            const payload = { userUuid: user.uuid};
            const signedPayload = await this.jwtInst.signJWT(payload, secret, options);
            res.status(200).json({uuid: user.uuid, token: signedPayload });
        } catch (err: any) {
            res.status(500).json({ err: err.message });
        }   
    }
}

const userController = new UserController(models.User, bcryptInstance, jwtInstance);

export default userController;