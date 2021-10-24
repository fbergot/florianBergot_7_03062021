import * as express from "express";
import postController from "../controller/PostController";
import authInstance from "../middleware/Auth";

export const router = (function (express_router): express.Router {
	const Router = express_router();

	//   Router.route("/register").post(userController.register);

	return Router;
})(express.Router);
