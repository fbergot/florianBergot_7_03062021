import { Request, Response } from 'express';
import { JSONWebToken, jwtInstance } from '../class/Jwt';
import * as dotenv from 'dotenv';

dotenv.config();

type DecodedToken = {
	userUuid: string,
	userId: number,
	isAdmin: boolean
}
/**
 * For auth users
 * @class Auth
 */
class Auth {

	private JSONWebTokenInst: JSONWebToken;
	private messages: {
		readonly unauthorized: string; 
		readonly errorMessageToken: string; 
	}

	constructor(JSONWebTokenInstance: JSONWebToken) {
		this.JSONWebTokenInst = JSONWebTokenInstance;
		this.messages = {
			unauthorized : "Request unauthorized",
			errorMessageToken : "Missing token or poorly formed (valid: 'Bearer 1e254e...')",
		}
    }

    /**
     * For verif auth (with token)
     * @memberof Auth
     */
    public async verifAuth (req: Request, res: Response, next: CallableFunction): Promise<void> {
		try {
			// --- get token in header & verify if token is valid ---
			const token = this.getTokenInHeader(req);
			const secret = process.env.SECRET ?? 'secret';
			const decodedToken: DecodedToken = await this.JSONWebTokenInst.verifyJWT(token, secret, {});           
			let userUuid: undefined | string;
			if (decodedToken) {
				userUuid = decodedToken.userUuid;
			}
			if (req.body.uuid && (req.body.uuid !== userUuid)) {
				res.status(403).json({ error: this.messages.unauthorized });
				return;
			}
			req.body.isAdmin = decodedToken.isAdmin;
			req.body.userId = decodedToken.userId;
			next();             
		} catch (e: any) {
			res.status(401).json({ error: e.message})
		}
    }

    /**
     * Get a token in req authorization header
     * @private
     * @throw if token
     * @memberof Auth
     */
    private getTokenInHeader(req: Request): string {
		// --- split autho string by space => ["Bearer", "1e254354d85sf.."] ---
		const token = req.headers.authorization?.split(' ')[1];
		if (!token || token.length < 10) throw Error(`${this.messages.errorMessageToken}`);
		return token;
	}
}

const authInstance = new Auth(jwtInstance);

export default authInstance;