import * as express from 'express';
import userController from '../controller/UserController';
import authInstance from "../middleware/Auth";
import multer from '../middleware/multer-config';

export const router = (function (express_router): express.Router {

    const Router = express_router();

    Router.route('/signup')
        .post(
            multer,
            (req, res, next) => userController.signup(req, res, next)
        );
    
    Router.route('/signin')
        .post((req, res, next) => userController.signin(req, res, next));
    
    Router.route('/delete/:email')
        .delete(
            (req, res, next) => authInstance.verifAuth(req, res, next),
            (req, res, next) => userController.delete(req, res, next)
    );
    
    Router.route('/update/:email')
        .put(
            (req, res, next) => authInstance.verifAuth(req, res, next),
            multer,
            (req, res, next) => userController.update(req, res, next)
        );

    return Router;
})(express.Router);

