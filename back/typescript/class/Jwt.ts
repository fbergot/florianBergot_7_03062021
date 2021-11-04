import * as jwt from 'jsonwebtoken';
import { JWT_Interface } from '../interface/all_Iterfaces';
import { JWT } from '../type/allTypes';

/**
 * For sign & verify token
 * @export
 * @class JSONWebToken
 */
export class JSONWebToken implements JWT_Interface {

    private readonly JWT: JWT;

    /**
     *Creates an instance of JSONWebToken.
     * @memberof JSONWebToken
     */
    constructor(module: JWT) {
        this.JWT = module;
    }
    
    /**
     * sign a token
     * @memberof JSONWebToken
     */
    public signJWT(payload: { userUuid: string }, secret: string, options: jwt.SignOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            this.JWT.sign(payload, secret, options, (err, token) => {
                err ? reject(err) : resolve(token);
            })
        })
    }

    /**
     * Verify a token
     * @memberof JSONWebToken
     */
    public verifyJWT(token: string, secret: jwt.Secret | jwt.GetPublicKeyOrSecret, options: jwt.VerifyOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            this.JWT.verify(token, secret, options, (err, decoded) => {
                err ? reject(err) : resolve(decoded);
            })
        })
    }
}

export const jwtInstance = new JSONWebToken(jwt);
