import * as express from "express";
import reactionController from "../controller/ReactionController";
import authInstance from "../middleware/Auth";

export const router = (function (express_router): express.Router {
	const Router = express_router();

	Router.route("/add")
		.post((req, res, next) => reactionController.create(req, res, next));

	return Router;
})(express.Router);

