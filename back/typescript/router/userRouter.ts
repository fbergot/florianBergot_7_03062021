import * as express from 'express';
import userController from '../controller/UserController';
import authInstance from "../middleware/Auth";

export const router = (function (express_router): express.Router {

    const Router = express_router();

    Router.route('/signup')
        .post((req, res, next) => userController.signup(req, res, next));
    
    Router.route('/signin')
        .post((req, res, next) => userController.signin(req, res, next));
    
    Router.route('/delete/:email')
        .post(
            (req, res, next) => authInstance.verifAuth(req, res, next),
            (req, res, next) => userController.delete(req, res, next)
        );

    return Router;
})(express.Router);

