"use strict";
exports.__esModule = true;
var express = require("express");
var Utils_1 = require("./class/Utils");
var userRouter_1 = require("./router/userRouter");
var app = express();
// add middlewares
app.use(express.json());
app.use(Utils_1["default"].setHeadersCORS);
var baseUrlUser = "/api/users";
var baseUrlPost = "/api/posts";
var baseUrlComment = "/api/comments";
var baseUrlCategory = "/api/categories";
var baseUrlReaction = "/api/reactions";
app.use(baseUrlUser, userRouter_1["default"]);
exports["default"] = app;
