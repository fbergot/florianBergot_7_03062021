import * as jwt from 'jsonwebtoken';

type PayloadInterface = {
    userId: number,
    userUuid: string
}
/**
 * For sign & verify token
 * @export
 * @class JSONWebToken
 */
export class JSONWebToken {

    private JWT: typeof jwt;

    /**
     *Creates an instance of JSONWebToken.
     * @memberof JSONWebToken
     */
    constructor(module: typeof jwt) {
        this.JWT = module;
    }
    
    /**
     * sign a token
     * @memberof JSONWebToken
     */
    public signJWT(payload: PayloadInterface, secret: string, options: jwt.SignOptions): Promise<any> {
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
    public verifyJWT(token: string, secret: jwt.Secret | jwt.GetPublicKeyOrSecret, options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.JWT.verify(token, secret, options, (err, decoded) => {
                err ? reject(err) : resolve(decoded);
            })
        })
    }
}

export const jwtInstance = new JSONWebToken(jwt);
