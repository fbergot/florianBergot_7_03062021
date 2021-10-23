import * as express from 'express';
import userController from '../controller/UserController';

const router = (function (express_router) {

    const Router = express_router();

    Router.route('/register').post((req, res, next) => userController.signup(req, res, next));

    return Router;
})(express.Router);

export default router;