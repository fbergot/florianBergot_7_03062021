"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var CategoryController_1 = require("../controller/CategoryController");
exports.router = (function (express_router) {
    var Router = express_router();
    Router.route("/create").post(function (req, res, next) { return CategoryController_1["default"].create(req, res, next); });
    Router.route("/getAll").get(function (req, res, next) { return CategoryController_1["default"].getAll(req, res, next); });
    return Router;
})(express.Router);
