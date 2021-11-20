import * as express from "express";
import reactionController from "../controller/ReactionController";
import authInstance from "../middleware/Auth";

export const router = (function (express_router: () => express.Router): express.Router {
	const Router = express_router();

	Router.route("/add/:postId")
		.post(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			(req, res, next) => reactionController.create(req, res, next)
		);
	
	Router.route("/getReactions/:postId")
		.get(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			(req, res, next) => reactionController.getReactionsOfPost(req, res, next)
		);

	return Router;
})(express.Router);

