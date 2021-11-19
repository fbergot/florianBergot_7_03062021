import * as express from "express";
import commentController from "../controller/CommentController";
import authInstance from "../middleware/Auth";

export const router = (function (express_router: () => express.Router): express.Router {
	const Router = express_router();

	Router.route("/add/:postId")
		.post(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			(req, res, next) => commentController.create(req, res, next)
		);
	
	Router.route("/delete/:commentId")
		.delete(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			(req, res, next) => commentController.delete(req, res, next)
	);
	
	Router.route("/getAll/:postId")
		.get(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			(req, res, next) => commentController.getAllPerPost(req, res, next)
		);

	return Router;
})(express.Router);
