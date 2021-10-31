"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var CategoryController_1 = require("../controller/CategoryController");
var Auth_1 = require("../middleware/Auth");
exports.router = (function (express_router) {
    var Router = express_router();
    Router.route("/add")
        .post(function (req, res, next) { return Auth_1["default"].verifAuth(req, res, next); }, function (req, res, next) { return CategoryController_1["default"].create(req, res, next); });
    Router.route("/all")
        .get(function (req, res, next) { return Auth_1["default"].verifAuth(req, res, next); }, function (req, res, next) { return CategoryController_1["default"].getAll(req, res, next); });
    Router.route("/:categoryId/posts")
        .get(function (req, res, next) { return Auth_1["default"].verifAuth(req, res, next); }, function (req, res, next) { return CategoryController_1["default"].getPostsInCategory(req, res, next); });
    return Router;
})(express.Router);
