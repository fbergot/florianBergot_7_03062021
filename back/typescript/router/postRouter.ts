import * as express from "express";
import postController from "../controller/PostController";
import authInstance from "../middleware/Auth";

export const router = (function (express_router): express.Router {
	const Router = express_router();

	Router.route("/add")
		.post((req, res, next) => postController.create(req, res, next));
	
	Router.route("/all")
		.get((req, res, next) => postController.getAll(req, res, next));

	return Router;
})(express.Router);

