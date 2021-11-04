import { SignOptions, Secret, GetPublicKeyOrSecret, VerifyOptions } from "jsonwebtoken";

export interface JWT_Interface {
    signJWT: (
        payload: { userUuid: string },
        secret: string,
        options: SignOptions
    ) => Promise<any>;

    verifyJWT: (
        token: string,
        secret: Secret | GetPublicKeyOrSecret,
        options: VerifyOptions
    ) => Promise<any>;
}