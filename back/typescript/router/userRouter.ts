import * as express from 'express';
import userController from '../controller/UserController';

export const router = (function (express_router) {

    const Router = express_router();

    Router.route('/signup').post((req, res, next) => userController.signup(req, res, next));
    Router.route('/signin').post((req, res, next) => userController.signin(req, res, next));

    return Router;
})(express.Router);

