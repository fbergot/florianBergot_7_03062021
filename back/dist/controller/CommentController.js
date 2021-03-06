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
var CommentController = /** @class */ (function () {
    function CommentController(commentModel, userModel) {
        this.commentModel = commentModel;
        this.userModel = userModel;
        this.messages = {
            notFound: "Comment not found",
            comDeleted: "Comment deleted",
            comNotDeleted: "Comment not deleted",
            infoNotFound: "Info user not found in token"
        };
    }
    /**
     * Create a comment for one post
     * @memberof CommentController
     */
    CommentController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, commentProp, newComment, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _a.sent();
                        commentProp = {
                            content: req.body.content,
                            UserId: tokenPayload.userId,
                            PostId: parseInt(req.params.postId)
                        };
                        return [4 /*yield*/, this.commentModel.create(commentProp)];
                    case 2:
                        newComment = _a.sent();
                        res.status(201).json(newComment);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.status(500).json({ error: err_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all comments per post
     * @memberof CommentController
     */
    CommentController.prototype.getAllPerPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var comments, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commentModel.findAll({
                                where: { postId: req.params.postId },
                                order: [
                                    ['createdAt', "DESC"]
                                ],
                                include: [
                                    {
                                        model: this.userModel
                                    }
                                ]
                            })];
                    case 1:
                        comments = _a.sent();
                        res.status(200).json(comments);
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
    /**
     * Delete one comment
     * @memberof CommentController
     */
    CommentController.prototype["delete"] = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, comment, deletedComment, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _a.sent();
                        return [4 /*yield*/, this.commentModel.findOne({
                                where: { id: req.params.commentId }
                            })];
                    case 2:
                        comment = _a.sent();
                        if (!comment) {
                            res.status(404).json({ message: this.messages.notFound });
                            return [2 /*return*/];
                        }
                        if (!(comment.UserId === tokenPayload.userId || tokenPayload.isAdmin)) return [3 /*break*/, 4];
                        return [4 /*yield*/, comment.destroy()];
                    case 3:
                        deletedComment = _a.sent();
                        res.status(200).json({ message: this.messages.comDeleted, info: { idComDeleted: deletedComment.id } });
                        return [2 /*return*/];
                    case 4:
                        res.status(403).json({ error: this.messages.comNotDeleted });
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        res.status(500).json({ error: err_3.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return CommentController;
}());
var commentController = new CommentController(models.Comment, models.User);
exports["default"] = commentController;
