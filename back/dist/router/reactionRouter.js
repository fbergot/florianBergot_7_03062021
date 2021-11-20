"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var ReactionController_1 = require("../controller/ReactionController");
var Auth_1 = require("../middleware/Auth");
exports.router = (function (express_router) {
    var Router = express_router();
    Router.route("/add/:postId")
        .post(function (req, res, next) { return Auth_1["default"].verifAuth(req, res, next); }, function (req, res, next) { return ReactionController_1["default"].create(req, res, next); });
    Router.route("/getReactions/:postId")
        .get(function (req, res, next) { return Auth_1["default"].verifAuth(req, res, next); }, function (req, res, next) { return ReactionController_1["default"].getReactionsOfPost(req, res, next); });
    return Router;
})(express.Router);
