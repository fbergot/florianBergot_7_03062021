"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Bcrypt_1 = require("../class/Bcrypt");
var Jwt_1 = require("../class/Jwt");
var Auth_1 = require("../middleware/Auth");
var dotenv = require("dotenv");
var fs = require("fs");
// import commonJS: sequelize models is in JS => (TS in allow JS)
var models = require('../../models');
dotenv.config();
var UserController = /** @class */ (function () {
    /**
     * Creates an instance of UserController.
     * @param {Bcrypt} bcryptInst -> injection dependency
     * @param {JSONWebToken} jwt -> injection dependency
     * @memberof UserController
     */
    function UserController(userModel, postModel, categoryModel, bcryptInst, jwt) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.categoryModel = categoryModel;
        this.bcryptInst = bcryptInst;
        this.jwtInst = jwt;
        this.messages = {
            badPass: "Bad password",
            userNotExist: 'User not exist, please signup',
            alreadyUser: "This user already exist",
            userDeleted: 'User deleted',
            userNotDeleted: 'Cannot delete this user, requires elevation of privilege',
            userNotFound: 'User not found',
            updatedSuccess: 'User data updated with success',
            notUpdate: 'Update impossible, require elevated privileges',
            infoNotFound: "Info user not found in token"
        };
    }
    /**
     * Erase img according to destImages path
     * @memberof PostController
     */
    UserController.prototype.eraseImage = function (user, destImages) {
        var fileName = user.urlAvatar.split("/" + destImages + "/")[1];
        return new Promise(function (resolve, reject) {
            fs.unlink(destImages + "/" + fileName, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    /**
     * Register an user (if not already exist)
     * @memberof UserController
     */
    UserController.prototype.signup = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var user, salt, password, hashPassord, destImages, imageUrl, newUser, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                where: { email: req.body.email }
                            })];
                    case 1:
                        user = _c.sent();
                        if (user) {
                            res.status(409).json({ error: this.messages.alreadyUser });
                            return [2 /*return*/];
                        }
                        salt = Number.parseInt((_a = process.env.SALT) !== null && _a !== void 0 ? _a : "10");
                        password = req.body.password;
                        return [4 /*yield*/, this.bcryptInst.bcryptHash(password, salt)];
                    case 2:
                        hashPassord = _c.sent();
                        destImages = (_b = process.env.DEST_USERS_IMAGES) !== null && _b !== void 0 ? _b : "avatars_images";
                        imageUrl = void 0;
                        if (req.file) {
                            imageUrl = req.protocol + "://" + req.get('host') + "/" + destImages + "/" + req.file.filename;
                        }
                        return [4 /*yield*/, this.userModel.create(__assign(__assign({}, req.body), { password: hashPassord, urlAvatar: imageUrl }))];
                    case 3:
                        newUser = _c.sent();
                        res.status(201).json(newUser);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _c.sent();
                        res.status(500).json({ err: err_1.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Signin an user
     * @memberof UserController
     */
    UserController.prototype.signin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, secret, options, payload, signedPayload, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                where: { email: req.body.email }
                            })];
                    case 1:
                        user = _a.sent();
                        // user not found ...
                        if (!user) {
                            res.status(404).json({ error: this.messages.userNotExist });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bcryptInst.bcryptCompare(req.body.password, user.password)];
                    case 2:
                        // check password & sign token
                        if (!(_a.sent())) {
                            res.status(401).json({ error: this.messages.badPass });
                            return [2 /*return*/];
                        }
                        // build & sign a payload for token
                        if (!process.env.SECRET) {
                            throw Error('Secret string for sign token is missing');
                        }
                        secret = process.env.SECRET;
                        options = { expiresIn: '6h' };
                        payload = { userUuid: user.uuid, userId: user.id, isAdmin: user.isAdmin };
                        return [4 /*yield*/, this.jwtInst.signJWT(payload, secret, options)];
                    case 3:
                        signedPayload = _a.sent();
                        res.status(200).json({ uuid: user.uuid, id: user.id, username: user.username, token: signedPayload });
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        res.status(500).json({ err: err_2.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all users
     * @memberof UserController
     */
    UserController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userModel.findAll({
                                attributes: ["username", 'email', 'createdAt', "urlAvatar", "businessRole"]
                            })];
                    case 1:
                        users = _a.sent();
                        res.status(200).json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(500).json({ error: err_3.messge });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * For delete account
     * @memberof UserController
     */
    UserController.prototype["delete"] = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, user, posts, destImages_1, userDeleted, destImages, err_4;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _c.sent();
                        return [4 /*yield*/, this.userModel.findOne({
                                where: { email: req.params.email }
                            })];
                    case 2:
                        user = _c.sent();
                        console.log(user);
                        if (!user) {
                            res.status(404).json({ message: this.messages.userNotFound });
                            return [2 /*return*/];
                        }
                        if (!((user.id === tokenPayload.userId) || tokenPayload.isAdmin)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.postModel.findAll({
                                where: { UserId: user.id }
                            })];
                    case 3:
                        posts = _c.sent();
                        if (posts) {
                            destImages_1 = (_a = process.env.DEST_POSTS_ATTACHMENTS) !== null && _a !== void 0 ? _a : "posts_attachments";
                            // loop in all posts for erase imgs before delete posts
                            posts.forEach(function (post) { return __awaiter(_this, void 0, void 0, function () {
                                function eraseImgPost() {
                                    var _a;
                                    var fileName = (_a = post.attachment) === null || _a === void 0 ? void 0 : _a.split("/" + destImages_1 + "/")[1];
                                    return new Promise(function (resolve, reject) {
                                        fs.unlink(destImages_1 + "/" + fileName, function (err) {
                                            if (err)
                                                reject(err);
                                            resolve(true);
                                        });
                                    });
                                }
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!post.attachment) return [3 /*break*/, 2];
                                            return [4 /*yield*/, eraseImgPost()];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [4 /*yield*/, this.userModel.destroy({
                                where: { id: user.id }
                            })];
                    case 4:
                        userDeleted = _c.sent();
                        // delete all posts for this user
                        return [4 /*yield*/, this.postModel.destroy({
                                where: { userId: user.id }
                            })
                            // if img, delete image
                        ];
                    case 5:
                        // delete all posts for this user
                        _c.sent();
                        destImages = (_b = process.env.DEST_USERS_IMAGES) !== null && _b !== void 0 ? _b : "avatars_images";
                        if (!user.urlAvatar) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.eraseImage(user, destImages)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        res.status(200).json({ message: this.messages.userDeleted, info: { username: userDeleted.username } });
                        return [2 /*return*/];
                    case 8:
                        res.status(403).json({ message: this.messages.userNotDeleted });
                        return [3 /*break*/, 10];
                    case 9:
                        err_4 = _c.sent();
                        console.error(err_4);
                        res.status(500).json({ error: err_4.message });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update data for an user
     * @memberof UserController
     */
    UserController.prototype.update = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, user, destImages, imageUrl, newPost, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _b.sent();
                        return [4 /*yield*/, this.userModel.findOne({
                                where: { email: req.params.email }
                            })
                            // if not user, delete new img
                        ];
                    case 2:
                        user = _b.sent();
                        // if not user, delete new img
                        if (!user) {
                            if (req.file) {
                                fs.unlink(req.file.path, function (err) {
                                    if (err)
                                        throw err;
                                });
                            }
                            res.status(404).json({ message: this.messages.userNotFound });
                            return [2 /*return*/];
                        }
                        destImages = void 0;
                        imageUrl = void 0;
                        if (req.file) {
                            destImages = (_a = process.env.DEST_USERS_IMAGES) !== null && _a !== void 0 ? _a : "avatars_images";
                            if (user.urlAvatar) {
                                this.eraseImage(user, destImages);
                            }
                            imageUrl = req.protocol + "://" + req.get('host') + "/" + destImages + "/" + req.file.filename;
                        }
                        if (!(user.id === tokenPayload.userId)) return [3 /*break*/, 4];
                        user.email = req.body.email ? req.body.email : user.email;
                        user.password = req.body.password ? req.body.password : user.password;
                        user.username = req.body.username ? req.body.username : user.username;
                        user.businessRole = req.body.businessRole ? req.body.businessRole : user.businessRole;
                        user.urlAvatar = imageUrl ? imageUrl : user.urlAvatar;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        newPost = _b.sent();
                        res.status(200).json({ message: this.messages.updatedSuccess, info: newPost });
                        return [2 /*return*/];
                    case 4:
                        res.status(403).json({ message: this.messages.notUpdate });
                        return [3 /*break*/, 6];
                    case 5:
                        err_5 = _b.sent();
                        res.status(500).json({ error: err_5.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get user infos with post(s)
     * @memberof UserController
     */
    UserController.prototype.me = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenPayload, user, posts, dataUserAndPosts, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, Auth_1["default"].getTokenInfo(req)];
                    case 1:
                        tokenPayload = _a.sent();
                        return [4 /*yield*/, this.userModel.findOne({
                                where: { id: tokenPayload.userId }
                            })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.postModel.findAll({
                                where: { userId: tokenPayload.userId },
                                order: [
                                    ["createdAt", "DESC"]
                                ],
                                include: [
                                    {
                                        model: this.categoryModel,
                                        attributes: ["name"]
                                    },
                                ]
                            })
                            // if not user with this userId
                        ];
                    case 3:
                        posts = _a.sent();
                        // if not user with this userId
                        if (!user) {
                            res.status(404).json({ message: this.messages.userNotFound });
                            return [2 /*return*/];
                        }
                        dataUserAndPosts = __assign(__assign({}, user), { Posts: __spreadArray([], posts, true) });
                        res.status(200).json(dataUserAndPosts);
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        res.status(500).json({ error: err_6.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
var userController = new UserController(models.User, models.Post, models.Category, Bcrypt_1.bcryptInstance, Jwt_1.jwtInstance);
exports["default"] = userController;
