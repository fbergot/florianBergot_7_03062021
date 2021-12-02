import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

class Validation {
    protected schemaAuth: any;

    /**
     * Creates an instance of Validation.
     * @param {typeof yup} yupM injection dependency
     * @memberof Validation
     */
    constructor(yupM: typeof yup) {
        this.schemaAuth = yupM.object().shape({
            email: yupM.string().required().email(),
            password: yupM.string().required().min(4),
            username: yupM.string().required(),
            businessRole: yupM.string().required()
        });
    }

    /**
     * Middleware validation user data
     * @memberof Validation
     */
    public async validationAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const statusValid = await this.schemaAuth.validate({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                businessRole: req.body.businessRole
            });

            if (statusValid) next();
        } catch (err: any) {
            res.status(400).json({ error: err });
        }
 
    }

}


export const validation = new Validation(yup);