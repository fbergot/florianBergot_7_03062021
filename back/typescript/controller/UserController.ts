import { NextFunction, Request, Response } from "express";
import { bcryptInstance, Bcrypt } from '../class/Bcrypt';
import { jwtInstance, JSONWebToken } from '../class/Jwt';
import * as dotenv from 'dotenv';
const models = require('../../models');

dotenv.config();

type User = {
readonly uuid: string,
readonly id: number,
	email: string,
	password: string,
	username: string,
	isAdmin: boolean,
	businessRole: string,
	updatedAt: string,
	createdAt: string
} & MethodsModel

type MethodsModel = {
	create<T>(data: {
		[key in keyof T]: T[key]
	}): Promise<T>;
	findOne<T>(filter: { where: any}): Promise<T|null>;
	destroy<T>(): Promise<T>
}

class UserController {

	private user: User;
	private bcryptInst: Bcrypt;
	private jwtInst: JSONWebToken;
	private messages: {
		readonly badPass: string,
		readonly userNotExist: string,
		readonly alreadyUser: string,
		readonly userDeleted: string,
		readonly userNotDeleted: string,
		readonly userNotFound: string,
	}

    constructor(user: User, bcryptInst: Bcrypt, jwt: JSONWebToken) { 
		this.user = user;
		this.bcryptInst = bcryptInst;
		this.jwtInst = jwt;
		this.messages = {
			badPass: "Bad password",
			userNotExist: 'User not exist, please signup',
			alreadyUser: "This user already exist",
			userDeleted: 'User deleted',
			userNotDeleted: 'Cannot delete this user, requires elevation of privilege',
			userNotFound: 'User not found'
		}
	}
	   
    /**
     * Register an user (if not already exist)
     * @memberof UserController
     */
    public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// verif if user already exist
			const user = await this.user.findOne<User>({
				where:  { email: req.body.email }
			});
			if (user) {
				res.status(409).json({ error: this.messages.alreadyUser });
				return;
			}
			// --- hash user password and create user in DB ---
			const salt = Number.parseInt(process.env.SALT ?? "10");
			const password: string = req.body.password;
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
	public async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
		// --- find if user exist with his email --- 
		var user;
		try {
			 user = await this.user.findOne<User>({
				where: { email: req.body.email }
			});
			if (!user) {
				res.status(404).json({ error: this.messages.userNotExist });
				return;
			}
			if (!await this.bcryptInst.bcryptCompare(req.body.password, user.password)) {
				res.status(401).json({ error: this.messages.badPass });
				return;
			}
			const secret = process.env.SECRET ?? "secret";
			const options = { expiresIn: '6h' };
			const payload = { userUuid: user.uuid, userId: user.id, isAdmin: user.isAdmin };
			const signedPayload = await this.jwtInst.signJWT(payload, secret, options);
			res.status(200).json({ uuid: user.uuid, token: signedPayload });
		} catch (err: any) {
			res.status(500).json({ err: err.message });
		}  
	}

	/**
	 * For delete account
	 * @memberof UserController
	 */
	public async delete(req: Request, res: Response, next: NextFunction) {
		try {
			// find the user to delete
			const user = await this.user.findOne<User>({
				where: {email: req.params.email}
			})
			if (!user) {
				res.status(404).json({ message: this.messages.userNotFound });
				return;
			}

			// compare user to delete with user authenticated || ckeck if is admin user
			if (user && user.id === req.body.userId || req.body.isAdmin) {
				const userDeleted = await user.destroy<User>();
				res.status(200).json({message: this.messages.userDeleted, info: {username: userDeleted.username}});
				return;				
			} else {
				res.status(401).json({ message: this.messages.userNotDeleted });
			}
	
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}



	}
}

const userController = new UserController(models.User, bcryptInstance, jwtInstance);

export default userController;