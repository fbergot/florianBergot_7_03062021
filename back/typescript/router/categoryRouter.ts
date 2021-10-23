import * as express from "express";
import categoryController from "../controller/CategoryController";

export const router = (function (express_router) {
	const Router = express_router();

	Router.route("/create").post((req, res, next) => categoryController.create(req, res, next));

	return Router;
})(express.Router);

