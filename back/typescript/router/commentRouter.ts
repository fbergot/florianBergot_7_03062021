import * as express from "express";
import commentController from "../controller/CommentController";
import authInstance from "../middleware/Auth";

export const router = (function (express_router): express.Router {
	const Router = express_router();

	Router.route("/register")
		.post((req, res, next) => commentController.create(req, res, next));

	return Router;
})(express.Router);
