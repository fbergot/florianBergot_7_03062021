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
exports.__esModule = true;
var Bcrypt_1 = require("../class/Bcrypt");
var Jwt_1 = require("../class/Jwt");
var dotenv = require("dotenv");
var fs = require("fs");
var models = require('../../models');
dotenv.config();
var UserController = /** @class */ (function () {
    function UserController(user, bcryptInst, jwt) {
        this.user = user;
        this.bcryptInst = bcryptInst;
        this.jwtInst = jwt;
        this.messages = {
            badPass: "Bad password",
            userNotExist: 'User not exist, please signup',
            alreadyUser: "This user already exist",
            userDeleted: 'User deleted',
            userNotDeleted: 'Cannot delete this user, requires elevation of privilege',
            userNotFound: 'User not found'
        };
    }
    /**
     * Register an user (if not already exist)
     * @memberof UserController
     */
    UserController.prototype.signup = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var user, salt, password, hashPassord, imageUrl, newUser, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.user.findOne({
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
                        imageUrl = void 0;
                        if (req.file) {
                            imageUrl = req.protocol + "://" + req.get('host') + "/images/" + ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
                        }
                        return [4 /*yield*/, this.user.create(__assign(__assign({}, req.body), { password: hashPassord, urlAvatar: imageUrl }))];
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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user, secret, options, payload, signedPayload, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.user.findOne({
                                where: { email: req.body.email }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(404).json({ error: this.messages.userNotExist });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bcryptInst.bcryptCompare(req.body.password, user.password)];
                    case 2:
                        if (!(_b.sent())) {
                            res.status(401).json({ error: this.messages.badPass });
                            return [2 /*return*/];
                        }
                        secret = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : "secret";
                        options = { expiresIn: '6h' };
                        payload = { userUuid: user.uuid, userId: user.id, isAdmin: user.isAdmin };
                        return [4 /*yield*/, this.jwtInst.signJWT(payload, secret, options)];
                    case 3:
                        signedPayload = _b.sent();
                        res.status(200).json({ uuid: user.uuid, token: signedPayload });
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _b.sent();
                        res.status(500).json({ err: err_2.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * For delete account
     * @memberof UserController
     */
    UserController.prototype["delete"] = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, fileName, userDeleted, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.user.findOne({
                                where: { email: req.params.email }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(404).json({ message: this.messages.userNotFound });
                            return [2 /*return*/];
                        }
                        if (!(user && user.id === req.body.userId || req.body.isAdmin)) return [3 /*break*/, 3];
                        // if img, delete image
                        if (user.urlAvatar) {
                            fileName = user.urlAvatar.split("/images/")[1];
                            fs.unlink("images/" + fileName, function (err) {
                                if (err)
                                    throw err;
                            });
                        }
                        return [4 /*yield*/, user.destroy()];
                    case 2:
                        userDeleted = _a.sent();
                        res.status(200).json({ message: this.messages.userDeleted, info: { username: userDeleted.username } });
                        return [2 /*return*/];
                    case 3:
                        res.status(401).json({ message: this.messages.userNotDeleted });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        res.status(500).json({ error: err_3.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
var userController = new UserController(models.User, Bcrypt_1.bcryptInstance, Jwt_1.jwtInstance);
exports["default"] = userController;
