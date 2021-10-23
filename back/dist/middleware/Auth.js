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
var Jwt_1 = require("../class/Jwt");
var dotenv = require("dotenv");
dotenv.config();
/**
 * For auth users
 * @class Auth
 */
var Auth = /** @class */ (function () {
    function Auth(JSONWebTokenInstance) {
        this.JSONWebTokenInst = JSONWebTokenInstance;
        this.messages = {
            unauthorized: "Request unauthorized",
            errorMessageToken: "Missing token or poorly formed (valid: 'Bearer 1e254e...')"
        };
    }
    /**
     * For verif auth (with token)
     * @memberof Auth
     */
    Auth.prototype.verifAuth = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var token, secret, decodedToken, userUuid, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        token = this.getTokenInHeader(req);
                        secret = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : '';
                        return [4 /*yield*/, this.JSONWebTokenInst.verifyJWT(token, secret, {})];
                    case 1:
                        decodedToken = _b.sent();
                        userUuid = void 0;
                        if (decodedToken) {
                            userUuid = decodedToken.userUuid;
                        }
                        if (req.body.uuid && (req.body.uuid !== userUuid)) {
                            res.status(403).json({ error: this.messages.unauthorized });
                            return [2 /*return*/];
                        }
                        // if ok, next middleware
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        res.status(401).json({ error: e_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a token in req authorization header
     * @private
     * @throw if token
     * @memberof Auth
     */
    Auth.prototype.getTokenInHeader = function (req) {
        var _a;
        // --- split => ["Bearer", "1e254354d85sf.."]
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token || token.length < 10)
            throw Error("" + this.messages.errorMessageToken);
        return token;
    };
    return Auth;
}());
var authInstance = new Auth(Jwt_1.jwtInstance);
exports["default"] = authInstance;
