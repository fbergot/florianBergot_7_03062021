import * as express from "express";
import postController from "../controller/PostController";
import authInstance from "../middleware/Auth";

export const router = (function (express_router) {
	const Router = express_router();

	Router.route("/register").post((req, res, next) => {});

	return Router;
})(express.Router);

