import * as express from "express";
import postController from "../controller/PostController";
import authInstance from "../middleware/Auth";
import { postMulter } from "../../dist/middleware/multer-config";

export const router = (function (express_router): express.Router {
	const Router = express_router();

	Router.route("/add")
		.post(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			postMulter,
			(req, res, next) => postController.create(req, res, next)
		);
	
	Router.route("/all")
		.get(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			(req, res, next) => postController.getAll(req, res, next)
	);

	Router.route("/update/:id")
		.put(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			postMulter,
			(req, res, next) => postController.update(req, res, next)
	);
	
	Router.route("/delete/:id")
		.delete(
			(req, res, next) => authInstance.verifAuth(req, res, next),
			(req, res, next) => postController.delete(req, res, next)
		);

	return Router;
})(express.Router);

