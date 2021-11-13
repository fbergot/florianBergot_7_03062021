import { NextFunction, Request, Response } from "express";
import { bcryptInstance, Bcrypt } from '../class/Bcrypt';
import { jwtInstance, JSONWebToken } from '../class/Jwt';
import authInstance from "../middleware/Auth";
import * as dotenv from 'dotenv';
import * as fs from "fs";
import type { User, Post, Messages } from "../type/allTypes";
// import commonJS: sequelize models is in JS => (TS in allow JS)
const models = require('../../models');

dotenv.config();

class UserController {

	private userModel: User;
	private postModel: Post;
	private bcryptInst: Bcrypt;
	private jwtInst: JSONWebToken;
	private messages: {
		+readonly [key in keyof Messages]: Messages[key];
	}

    constructor(userModel: User, postModel: Post, bcryptInst: Bcrypt, jwt: JSONWebToken) { 
		this.userModel = userModel;
		this.postModel = postModel;
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
	 * Erase img according to destImages path
	 * @memberof PostController
	 */
	private eraseImage(user: User, destImages: string) {
		const fileName = user.urlAvatar.split(`/${destImages}/`)[1];
		fs.unlink(`${destImages}/${fileName}`, (err: any )=> {
			if (err) throw err;
		});
	}
	   
    /**
     * Register an user (if not already exist)
     * @memberof UserController
     */
	public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// verif if user already exist
			const user = await this.userModel.findOne<User>({
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
			const destImages = process.env.DEST_USERS_IMAGES ?? "avatars_images";
			let imageUrl: undefined | string;
			if (req.file) {
				imageUrl = `${req.protocol}://${req.get('host')}/${destImages}/${req.file.filename}`;
			}
			const newUser = await this.userModel.create<User>({ ...req.body, password: hashPassord, urlAvatar: imageUrl});            
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
			const user = await this.userModel.findOne<User>({
				where: { email: req.body.email }
			});
			if (!user) {
				res.status(404).json({ error: this.messages.userNotExist });
				return;
			}
			// check password & sign token
			if (!await this.bcryptInst.bcryptCompare(req.body.password, user.password)) {
				res.status(401).json({ error: this.messages.badPass });
				return;
			}
			const secret = process.env.SECRET ?? "secret";
			const options = { expiresIn: '6h' };
			const payload = { userUuid: user.uuid, userId: user.id, isAdmin: user.isAdmin };
			const signedPayload = await this.jwtInst.signJWT(payload, secret, options);
			res.status(200).json({ uuid: user.uuid, username: user.username, token: signedPayload });
		} catch (err: any) {
			res.status(500).json({ err: err.message });
		}  
	}

	/**
	 * Get all users
	 * @memberof UserController
	 */
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const users = await this.userModel.findAll<User>({
				attributes: ["username", 'email', 'createdAt', "urlAvatar"]
			});
			res.status(200).json(users);
		} catch (err: any) {
			res.status(500).json({ error: err.messge });
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
			const user = await this.userModel.findOne<User>({
				where: {email: req.params.email}
			})
			if (!user) {
				res.status(404).json({ message: this.messages.userNotFound });
				return;
			}

			// ckeck if it is the user || ckeck if is admin user
			if ((user.id === tokenPayload.userId )|| tokenPayload.isAdmin) {
				// if img, delete image
				const destImages = process.env.DEST_USERS_IMAGES ?? "avatars_images";
				if (user.urlAvatar) {
					this.eraseImage(user, destImages);
				}
				// del user
				const userDeleted = await user.destroy<User>();
				res.status(200).json({ message: this.messages.userDeleted, info: { username: userDeleted.username } });
				return;				
			}
			res.status(403).json({ message: this.messages.userNotDeleted });	
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	/**
	 * Update data for an user
	 * @memberof UserController
	 */
	public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// get userInfo
			const tokenPayload = await authInstance.getTokenInfo(req);
			// find the user to update
			const user = await this.userModel.findOne<User>({
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

			// if file, delete old img (if exist )and create new path to img
			let destImages: undefined | string;
			let imageUrl: undefined | string;
			if (req.file) {
				destImages = process.env.DEST_USERS_IMAGES ?? "avatars_images";
				if (user.urlAvatar) {
					this.eraseImage(user, destImages);					
				}
				imageUrl = `${req.protocol}://${req.get('host')}/${destImages}/${req.file.filename}`;
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

	/**
	 * Get user infos with post(s)
	 * @memberof UserController
	 */
	public async me(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// get userInfo
			const tokenPayload = await authInstance.getTokenInfo(req);
			// find user with posts associated
			const user = await this.userModel.findOne<User>({
				where: { id: tokenPayload.userId },
				include: [
					{
						model: this.postModel
					}
				]
			});

			if (!user) {
				res.status(404).json({ message: this.messages.userNotFound });
				return;
			}
			res.status(200).json(user);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}

const userController = new UserController(models.User, models.Post, bcryptInstance, jwtInstance);

export default userController;