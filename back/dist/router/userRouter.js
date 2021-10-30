"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var UserController_1 = require("../controller/UserController");
var Auth_1 = require("../middleware/Auth");
var multer_config_1 = require("../middleware/multer-config");
exports.router = (function (express_router) {
    var Router = express_router();
    Router.route('/signup')
        .post(multer_config_1.avatarMulter, function (req, res, next) { return UserController_1["default"].signup(req, res, next); });
    Router.route('/signin')
        .post(function (req, res, next) { return UserController_1["default"].signin(req, res, next); });
    Router.route('/delete/:email')["delete"](function (req, res, next) { return Auth_1["default"].verifAuth(req, res, next); }, function (req, res, next) { return UserController_1["default"]["delete"](req, res, next); });
    Router.route('/update/:email')
        .put(function (req, res, next) { return Auth_1["default"].verifAuth(req, res, next); }, multer_config_1.avatarMulter, function (req, res, next) { return UserController_1["default"].update(req, res, next); });
    Router.route('/me')
        .get(function (req, res, next) { return Auth_1["default"].verifAuth(req, res, next); }, function (req, res, next) { return UserController_1["default"].me(req, res, next); });
    return Router;
})(express.Router);
