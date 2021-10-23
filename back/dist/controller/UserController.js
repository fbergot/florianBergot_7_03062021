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
var models = require('../../models');
var UserController = /** @class */ (function () {
    function UserController(user, bcryptInst, jwt) {
        this.user = user;
        this.bcryptInst = bcryptInst;
        this.jwtInst = jwt;
        this.messages = {
            badPass: "Bad password",
            userNotExist: 'User not exist, please signup'
        };
    }
    /**
     * Register an user
     * @memberof UserController
     */
    UserController.prototype.signup = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var salt, password, hashPassord, newUser, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        salt = Number.parseInt((_a = process.env.SALT) !== null && _a !== void 0 ? _a : "10");
                        password = req.body.password;
                        return [4 /*yield*/, this.bcryptInst.bcryptHash(password, salt)];
                    case 1:
                        hashPassord = _b.sent();
                        return [4 /*yield*/, this.user.create(__assign(__assign({}, req.body), { password: hashPassord }))];
                    case 2:
                        newUser = _b.sent();
                        res.status(201).json(newUser);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.status(500).json({ err: err_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
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
            var user, err_2, secret, options, payload, signedPayload, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.user.findOne({
                                where: { email: req.body.email }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(404).json({ error: this.messages.userNotExist });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _b.sent();
                        res.status(500).json({ err: err_2.message });
                        return [3 /*break*/, 3];
                    case 3:
                        _b.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this.bcryptInst.bcryptCompare(req.body.password, user.password)];
                    case 4:
                        if (!(_b.sent())) {
                            console.log(user);
                            res.status(401).json({ error: this.messages.badPass });
                            return [2 /*return*/];
                        }
                        secret = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : "secret";
                        options = { expiresIn: '2h' };
                        payload = { userUuid: user.uuid };
                        return [4 /*yield*/, this.jwtInst.signJWT(payload, secret, options)];
                    case 5:
                        signedPayload = _b.sent();
                        res.status(200).json({ uuid: user.uuid, token: signedPayload });
                        return [3 /*break*/, 7];
                    case 6:
                        err_3 = _b.sent();
                        res.status(500).json({ err: err_3.message });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
var userController = new UserController(models.User, Bcrypt_1.bcryptInstance, Jwt_1.jwtInstance);
exports["default"] = userController;
