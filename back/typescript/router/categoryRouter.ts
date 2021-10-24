import * as express from "express";
import categoryController from "../controller/CategoryController";
import authInstance from "../middleware/Auth";

export const router = (function (express_router): express.Router {
	const Router = express_router();

	Router.route("/add").post((req, res, next) => categoryController.create(req, res, next));
	Router.route("/all").get((req, res, next) => categoryController.getAll(req, res, next));

	return Router;
})(express.Router);

