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
// import commonJS: in JS (sequelize models) (TS in allow JS)
var models = require("../../models");
var ReactionController = /** @class */ (function () {
    function ReactionController(reactionModel, postModel, reactionPostModel) {
        this.reactionModel = reactionModel;
        this.postModel = postModel;
        this.reactionPostModel = reactionPostModel;
        this.messages = {
            alreadyLiked: "User already liked",
            alreadyDisliked: "User already disliked",
            delDislike: 'Dislike deleted',
            delLiked: "Like deleted",
            badKey: "Bad key (accepted: like/dislike)",
            postNotFound: "Post not found"
        };
    }
    /**
     * Analyse reaction and state of old reaction (if exist)
     * @memberof ReactionController
     */
    ReactionController.prototype.analyseReaction = function (oldReaction, likeOrDislike, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!oldReaction) return [3 /*break*/, 8];
                        _a = likeOrDislike;
                        switch (_a) {
                            case "like": return [3 /*break*/, 1];
                            case 'dislike': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(oldReaction.likeOrDislike === 'like')) return [3 /*break*/, 2];
                        res.status(409).json({ message: this.messages.alreadyLiked });
                        return [2 /*return*/, true];
                    case 2:
                        if (!(oldReaction.likeOrDislike === 'dislike')) return [3 /*break*/, 4];
                        return [4 /*yield*/, oldReaction.destroy()];
                    case 3:
                        _b.sent();
                        res.status(200).json({ message: this.messages.delDislike });
                        return [2 /*return*/, true];
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        if (!(oldReaction.likeOrDislike === 'dislike')) return [3 /*break*/, 6];
                        res.status(409).json({ message: this.messages.alreadyDisliked });
                        return [2 /*return*/, true];
                    case 6:
                        if (!(oldReaction.likeOrDislike === 'like')) return [3 /*break*/, 8];
                        return [4 /*yield*/, oldReaction.destroy()];
                    case 7:
                        _b.sent();
                        res.status(200).json({ message: this.messages.delLiked });
                        return [2 /*return*/, true];
                    case 8: return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Create one reaction for a post
     * @memberof ReactionController
     */
    ReactionController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload_1, post, userOldReaction, idReaction, oldReaction, _a, oldReactionPost, oldReactionPost, newReaction, $React, newReaction, $React, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 26, , 27]);
                        if (req.body.likeOrDislike !== "like" && req.body.likeOrDislike !== "dislike") {
                            res.status(400).json({ message: this.messages.badKey });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload_1 = _b.sent();
                        return [4 /*yield*/, this.postModel.findOne({
                                where: { id: req.params.postId },
                                include: [
                                    {
                                        model: this.reactionModel
                                    }
                                ]
                            })];
                    case 2:
                        post = _b.sent();
                        if (!post) {
                            res.status(404).json({ message: this.messages.postNotFound });
                            return [2 /*return*/];
                        }
                        if (!(post.Reactions.length !== 0)) return [3 /*break*/, 22];
                        userOldReaction = post.Reactions.find(function (reaction) {
                            return reaction.userId === tokenPayload_1.userId;
                        });
                        if (!userOldReaction) return [3 /*break*/, 18];
                        idReaction = userOldReaction.id;
                        return [4 /*yield*/, this.reactionModel.findOne({
                                where: { id: idReaction }
                            })];
                    case 3:
                        oldReaction = _b.sent();
                        if (!oldReaction) return [3 /*break*/, 16];
                        _a = oldReaction.likeOrDislike;
                        switch (_a) {
                            case "like": return [3 /*break*/, 4];
                            case 'dislike': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 15];
                    case 4:
                        if (!(req.body.likeOrDislike === 'like')) return [3 /*break*/, 5];
                        res.status(409).json({ message: this.messages.alreadyLiked });
                        return [2 /*return*/];
                    case 5:
                        if (!(req.body.likeOrDislike === 'dislike')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.reactionPostModel.findOne({
                                where: { postId: post.id, reactionId: idReaction }
                            })];
                    case 6:
                        oldReactionPost = _b.sent();
                        return [4 /*yield*/, oldReactionPost.destroy()];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, oldReaction.destroy()];
                    case 8:
                        _b.sent();
                        res.status(200).json({ message: this.messages.delLiked });
                        return [2 /*return*/];
                    case 9: return [3 /*break*/, 15];
                    case 10:
                        if (!(req.body.likeOrDislike === 'dislike')) return [3 /*break*/, 11];
                        res.status(409).json({ message: this.messages.alreadyDisliked });
                        return [2 /*return*/];
                    case 11:
                        if (!(req.body.likeOrDislike === 'like')) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.reactionPostModel.findOne({
                                where: { postId: post.id, reactionId: idReaction }
                            })];
                    case 12:
                        oldReactionPost = _b.sent();
                        return [4 /*yield*/, oldReactionPost.destroy()];
                    case 13:
                        _b.sent();
                        return [4 /*yield*/, oldReaction.destroy()];
                    case 14:
                        _b.sent();
                        res.status(200).json({ message: this.messages.delDislike });
                        return [2 /*return*/];
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        res.status(404).json({ error: "Old reaction missing" });
                        _b.label = 17;
                    case 17: return [3 /*break*/, 21];
                    case 18: return [4 /*yield*/, this.reactionModel.create({
                            UserId: tokenPayload_1.userId,
                            likeOrDislike: req.body.likeOrDislike
                        })];
                    case 19:
                        newReaction = _b.sent();
                        return [4 /*yield*/, post.addReaction(newReaction)];
                    case 20:
                        $React = _b.sent();
                        res.status(201).json($React);
                        _b.label = 21;
                    case 21: return [3 /*break*/, 25];
                    case 22: return [4 /*yield*/, this.reactionModel.create({
                            UserId: tokenPayload_1.userId,
                            likeOrDislike: req.body.likeOrDislike
                        })];
                    case 23:
                        newReaction = _b.sent();
                        return [4 /*yield*/, post.addReaction(newReaction)];
                    case 24:
                        $React = _b.sent();
                        res.status(201).json($React);
                        _b.label = 25;
                    case 25: return [3 /*break*/, 27];
                    case 26:
                        err_1 = _b.sent();
                        res.status(500).json({ error: err_1.message });
                        return [3 /*break*/, 27];
                    case 27: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get reactions for a post
     * @memberof ReactionController
     */
    ReactionController.prototype.getReactionsOfPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var postWithReaction, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postModel.findOne({
                                where: { id: req.params.postId },
                                include: [
                                    {
                                        model: this.reactionModel
                                    }
                                ]
                            })];
                    case 1:
                        postWithReaction = _a.sent();
                        if (postWithReaction) {
                            res.status(200).json(postWithReaction);
                        }
                        else {
                            res.status(404).json({ message: 'No post with this id', postWithReaction: postWithReaction });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).json({ error: err_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ReactionController;
}());
var reactionController = new ReactionController(models.Reaction, models.Post, models.ReactionPost);
exports["default"] = reactionController;
