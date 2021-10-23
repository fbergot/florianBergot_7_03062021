import * as express from "express";
import postController from "../controller/PostController";

export const router = (function (express_router) {
	const Router = express_router();

	//   Router.route("/register").post(userController.register);

	return Router;
})(express.Router);
