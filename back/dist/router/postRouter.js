"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var PostController_1 = require("../controller/PostController");
exports.router = (function (express_router) {
    var Router = express_router();
    Router.route("/add")
        .post(function (req, res, next) { return PostController_1["default"].create(req, res, next); });
    Router.route("/all")
        .get(function (req, res, next) { return PostController_1["default"].getAll(req, res, next); });
    return Router;
})(express.Router);
