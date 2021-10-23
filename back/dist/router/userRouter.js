"use strict";
exports.__esModule = true;
var express = require("express");
var UserController_1 = require("../controller/UserController");
var router = (function (express_router) {
    var Router = express_router();
    Router.route('/register').post(function (req, res, next) { return UserController_1["default"].signup(req, res, next); });
    return Router;
})(express.Router);
exports["default"] = router;
