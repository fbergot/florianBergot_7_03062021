"use strict";
exports.__esModule = true;
var express = require("express");
var Utils_1 = require("./class/Utils");
var userRouter_1 = require("./router/userRouter");
var postRouter_1 = require("./router/postRouter");
var commentRouter_1 = require("./router/commentRouter");
var categoryRouter_1 = require("./router/categoryRouter");
var reactionRouter_1 = require("./router/reactionRouter");
var app = express();
var baseUrlUser = "/api/users";
var baseUrlPost = "/api/posts";
var baseUrlComment = "/api/comments";
var baseUrlCategory = "/api/categories";
var baseUrlReaction = "/api/reactions";
// add middlewares
app.use(express.json());
app.use("/images", express.static("images"));
app.use(Utils_1["default"].setHeadersCORS);
// router
app.use(baseUrlUser, userRouter_1.router);
app.use(baseUrlPost, postRouter_1.router);
app.use(baseUrlComment, commentRouter_1.router);
app.use(baseUrlCategory, categoryRouter_1.router);
app.use(baseUrlReaction, reactionRouter_1.router);
exports["default"] = app;
