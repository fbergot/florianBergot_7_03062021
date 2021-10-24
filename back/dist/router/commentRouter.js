"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var CommentController_1 = require("../controller/CommentController");
exports.router = (function (express_router) {
    var Router = express_router();
    Router.route("/register")
        .post(function (req, res, next) { return CommentController_1["default"].create(req, res, next); });
    return Router;
})(express.Router);
