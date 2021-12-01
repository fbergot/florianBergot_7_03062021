import * as jwt from "jsonwebtoken";

export default class Jwt {
    /**
     * Verify a token
     * @static
     * @memberof Jwt
     */
    static verify(token: string, secret: jwt.Secret | jwt.GetPublicKeyOrSecret, options: jwt.VerifyOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, options, (err, decoded) => {
                err ? reject(err) : resolve(decoded);
            })
        });
    }
}
