"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Auth_1 = require("../middleware/Auth");
var dotenv = require("dotenv");
var fs = require("fs");
var models = require("../../models");
dotenv.config();
var PostController = /** @class */ (function () {
    function PostController(postModel, categoryModel, userModel, commentModel, reactionModel) {
        this.postModel = postModel;
        this.categoryModel = categoryModel;
        this.userModel = userModel;
        this.commentModel = commentModel;
        this.reactionModel = reactionModel;
        this.messages = {
            noPost: "Not post with this id",
            postDeleted: "Post deleted",
            postNotDeleted: 'Cannot delete this post, requires elevation of privilege',
            notFound: "Post not found",
            modified: "Post modified",
            notAutho: 'Modification not authorized',
            infoNotFound: "Info user not found in token"
        };
    }
    /**
     * Create a post with category
     * @memberof PostController
     */
    PostController.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, destImages, imageUrl, data, newPost, categoryOfPost, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _b.sent();
                        destImages = void 0;
                        imageUrl = void 0;
                        if (req.file) {
                            destImages = (_a = process.env.DEST_POSTS_ATTACHMENTS) !== null && _a !== void 0 ? _a : "posts_attachments";
                            imageUrl = req.protocol + "://" + req.get('host') + "/" + destImages + "/" + req.file.filename;
                        }
                        data = {
                            urlAvatar: imageUrl,
                            content: req.body.content,
                            UserId: tokenPayload.userId,
                            category: req.body.category
                        };
                        return [4 /*yield*/, this.postModel.create(data)];
                    case 2:
                        newPost = _b.sent();
                        return [4 /*yield*/, this.categoryModel.findOrCreate({
                                where: { name: req.body.category },
                                "default": {
                                    name: req.body.category || 'divers'
                                }
                            })];
                    case 3:
                        categoryOfPost = _b.sent();
                        return [4 /*yield*/, newPost.addCategory(categoryOfPost)];
                    case 4:
                        _b.sent();
                        res.status(201).json(newPost);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        res.status(500).json({ error: err_1.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all posts with associations
     * @memberof PostController
     */
    PostController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var posts, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postModel.findAll({
                                include: [
                                    {
                                        model: this.userModel,
                                        attributes: ['username']
                                    },
                                    {
                                        model: this.commentModel
                                    },
                                    {
                                        model: this.categoryModel,
                                        attributes: ['name']
                                    },
                                    {
                                        model: this.reactionModel
                                    }
                                ]
                            })];
                    case 1:
                        posts = _a.sent();
                        res.status(200).json(posts);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).json({ error: err_2.messge });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update one message
     * @memberof PostController
     */
    PostController.prototype.update = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, post, destImages, imageUrl, fileName, newPost, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _b.sent();
                        return [4 /*yield*/, this.postModel.findOne({
                                where: { id: req.params.id }
                            })];
                    case 2:
                        post = _b.sent();
                        if (!post) {
                            res.status(404).json({ message: this.messages.notFound });
                            return [2 /*return*/];
                        }
                        destImages = void 0;
                        imageUrl = void 0;
                        if (req.file) {
                            destImages = (_a = process.env.DEST_POSTS_ATTACHMENTS) !== null && _a !== void 0 ? _a : "posts_attachments";
                            if (post.attachment) {
                                fileName = post.attachment.split("/" + destImages + "/")[1];
                                fs.unlink(destImages + "/" + fileName, function (err) {
                                    if (err)
                                        throw err;
                                });
                            }
                            imageUrl = req.protocol + "://" + req.get('host') + "/" + destImages + "/" + req.file.filename;
                        }
                        if (!(post.UserId === tokenPayload.userId)) return [3 /*break*/, 4];
                        post.attachment = imageUrl;
                        post.content = req.body.content;
                        return [4 /*yield*/, post.save()];
                    case 3:
                        newPost = _b.sent();
                        res.status(200).json({ message: this.messages.modified, info: newPost });
                        return [2 /*return*/];
                    case 4:
                        res.status(403).json({ message: this.messages.notAutho });
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _b.sent();
                        res.status(500).json({ error: err_3.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete one post
     * @memberof PostController
     */
    PostController.prototype["delete"] = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, post, destImages, fileName, deletedPost, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _b.sent();
                        return [4 /*yield*/, this.postModel.findOne({
                                where: { id: req.params.id }
                            })];
                    case 2:
                        post = _b.sent();
                        if (!post) {
                            res.status(404).json({ message: this.messages.noPost });
                            return [2 /*return*/];
                        }
                        if (!((post.UserId === tokenPayload.userId) || tokenPayload.isAdmin)) return [3 /*break*/, 4];
                        destImages = void 0;
                        if (post.attachment) {
                            destImages = (_a = process.env.DEST_POSTS_ATTACHMENTS) !== null && _a !== void 0 ? _a : "post_attachments";
                            fileName = post.attachment.split("/" + destImages + "/")[1];
                            fs.unlink(destImages + "/" + fileName, function (err) {
                                if (err)
                                    throw err;
                            });
                        }
                        return [4 /*yield*/, post.destroy()];
                    case 3:
                        deletedPost = _b.sent();
                        res.status(200).json({ message: this.messages.postDeleted, info: { idPostDeleted: deletedPost.id } });
                        return [2 /*return*/];
                    case 4:
                        res.status(403).json({ error: this.messages.postNotDeleted });
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _b.sent();
                        res.status(500).json({ error: err_4.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}());
var postController = new PostController(models.Post, models.Category, models.User, models.Comment, models.Reaction);
exports["default"] = postController;
