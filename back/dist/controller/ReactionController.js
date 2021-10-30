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
var models = require("../../models");
var ReactionController = /** @class */ (function () {
    function ReactionController(reactionModel, postModel) {
        this.reactionModel = reactionModel;
        this.postModel = postModel;
    }
    /**
     * Create one reaction for a post
     * @memberof ReactionController
     */
    ReactionController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, oldReaction, _a, newReaction, post, $React, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 14, , 15]);
                        if (req.body.likeOrDislike !== "like" && req.body.likeOrDislike !== "dislike") {
                            res.status(400).json({ message: "Bad key (accepted: like/dislike) given: " + req.body.likeOrDislike });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _b.sent();
                        return [4 /*yield*/, this.reactionModel.findOne({
                                where: { userId: tokenPayload.userId }
                            })];
                    case 2:
                        oldReaction = _b.sent();
                        if (!oldReaction) return [3 /*break*/, 10];
                        _a = req.body.likeOrDislike;
                        switch (_a) {
                            case "like": return [3 /*break*/, 3];
                            case 'dislike': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 10];
                    case 3:
                        if (!(oldReaction.likeOrDislike === 'like')) return [3 /*break*/, 4];
                        res.status(409).json({ message: "User already liked" });
                        return [2 /*return*/];
                    case 4:
                        if (!(oldReaction.likeOrDislike === 'dislike')) return [3 /*break*/, 6];
                        return [4 /*yield*/, oldReaction.destroy()];
                    case 5:
                        _b.sent();
                        res.status(200).json({ message: 'Dislike deleted' });
                        return [2 /*return*/];
                    case 6: return [3 /*break*/, 10];
                    case 7:
                        if (!(oldReaction.likeOrDislike === 'dislike')) return [3 /*break*/, 8];
                        res.status(409).json({ message: "User already disliked" });
                        return [2 /*return*/];
                    case 8:
                        if (!(oldReaction.likeOrDislike === 'like')) return [3 /*break*/, 10];
                        return [4 /*yield*/, oldReaction.destroy()];
                    case 9:
                        _b.sent();
                        res.status(200).json({ message: 'Like deleted' });
                        return [2 /*return*/];
                    case 10: return [4 /*yield*/, this.reactionModel.create({
                            UserId: tokenPayload.userId,
                            likeOrDislike: req.body.likeOrDislike
                        })
                        // find the post for add reaction			 
                    ];
                    case 11:
                        newReaction = _b.sent();
                        return [4 /*yield*/, this.postModel.findOne({
                                where: { id: req.params.postId }
                            })];
                    case 12:
                        post = _b.sent();
                        if (!post) {
                            res.status(404).json({ message: "Post not found" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, post.addReaction(newReaction)];
                    case 13:
                        $React = _b.sent();
                        res.status(201).json($React);
                        return [3 /*break*/, 15];
                    case 14:
                        err_1 = _b.sent();
                        res.status(500).json({ error: err_1.message });
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    return ReactionController;
}());
var reactionController = new ReactionController(models.Reaction, models.Post);
exports["default"] = reactionController;
