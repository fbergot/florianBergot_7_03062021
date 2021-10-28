import { NextFunction, Request, Response } from "express";
import { bcryptInstance, Bcrypt } from '../class/Bcrypt';
import { jwtInstance, JSONWebToken } from '../class/Jwt';
import authInstance from "../middleware/Auth";
import * as dotenv from 'dotenv';
import * as fs from "fs";
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
	urlAvatar?: string,
	updatedAt: string,
	createdAt: string
} & MethodsModel

type MethodsModel = {
	create<T>(data: {
		[key in keyof T]: T[key]
	}): Promise<T>;
	findOne<T>(filter: { where: any}): Promise<T|null>;
	destroy<T>(): Promise<T>;
	save<T>(): Promise<T>;
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
		readonly updatedSuccess: string,
		readonly notUpdate: string,
		readonly infoNotFound: string
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
			userNotFound: 'User not found',
			updatedSuccess: 'User data updated with success',
			notUpdate: 'Update impossible, require elevated privileges',
			infoNotFound: "Info user not found in token"
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
			// build imageUrl if img exist
			let imageUrl;
			if (req.file) {
				imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
			}
			const newUser = await this.user.create<User>({ ...req.body, password: hashPassord, urlAvatar: imageUrl });            
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
		try {
			// --- find if user exist with this email --- 
			const user = await this.user.findOne<User>({
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
	public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// get userInfo
			const tokenPayload = await authInstance.getTokenInfo(req);
			// find the user to delete
			const user = await this.user.findOne<User>({
				where: {email: req.params.email}
			})
			if (!user) {
				res.status(404).json({ message: this.messages.userNotFound });
				return;
			}

			// ckeck if it is the user || ckeck if is admin user
			if ((user.id === tokenPayload.userId )|| tokenPayload.isAdmin) {
				// if img, delete image
				if (user.urlAvatar) {
					const fileName = user.urlAvatar.split("/images/")[1];
					fs.unlink(`images/${fileName}`, err => {
						if (err) throw err;
					})
				}
				// del user
				const userDeleted = await user.destroy<User>();
				res.status(200).json({message: this.messages.userDeleted, info: {username: userDeleted.username}});
				return;				
			}
			res.status(403).json({ message: this.messages.userNotDeleted });	
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// get userInfo
			const tokenPayload = await authInstance.getTokenInfo(req);
			// find the user to update
			const user = await this.user.findOne<User>({
				where: {email: req.params.email}
			})
			// if not user, delete new img
			if (!user) {
				if (req.file) {
					fs.unlink(req.file.path, err => {
						if (err) throw err;
					})
				}			
				res.status(404).json({ message: this.messages.userNotFound });
				return;
			}

			// if file, delete old img if exist and create new path to img 
			let imageUrl;
			if (req.file) {
				if (user.urlAvatar) {
					const fileName = user.urlAvatar.split("/images/")[1];
					fs.unlink(`images/${fileName}`, err => {
						if (err) throw err;
					})					
				}
				imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
			}

			// ckeck if it is the good user 
			if (user.id === tokenPayload.userId) {				
				user.email = req.body.email ? req.body.email : user.email;
				user.password = req.body.password ? req.body.password : user.password;
				user.username = req.body.username ? req.body.username : user.username;
				user.businessRole = req.body.businessRole ? req.body.businessRole : user.businessRole;
				user.urlAvatar = imageUrl ? imageUrl : user.urlAvatar;
				// save new data
				const newPost = await user.save<User>();
				res.status(200).json({ message: this.messages.updatedSuccess, info: newPost });
				return;
			}
			res.status(403).json({ message: this.messages.notUpdate });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}

const userController = new UserController(models.User, bcryptInstance, jwtInstance);

export default userController;