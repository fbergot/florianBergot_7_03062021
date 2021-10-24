"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var ReactionController_1 = require("../controller/ReactionController");
exports.router = (function (express_router) {
    var Router = express_router();
    Router.route("/add")
        .post(function (req, res, next) { return ReactionController_1["default"].create(req, res, next); });
    return Router;
})(express.Router);
