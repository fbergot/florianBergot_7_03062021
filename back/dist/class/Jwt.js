"use strict";
exports.__esModule = true;
exports.jwtInstance = exports.JSONWebToken = void 0;
var jwt = require("jsonwebtoken");
/**
 * For sign & verify token
 * @export
 * @class JSONWebToken
 */
var JSONWebToken = /** @class */ (function () {
    /**
     *Creates an instance of JSONWebToken.
     * @memberof JSONWebToken
     */
    function JSONWebToken(module) {
        this.JWT = module;
    }
    /**
     * sign a token
     * @memberof JSONWebToken
     */
    JSONWebToken.prototype.signJWT = function (payload, secret, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.JWT.sign(payload, secret, options, function (err, token) {
                err ? reject(err) : resolve(token);
            });
        });
    };
    /**
     * Verify a token
     * @memberof JSONWebToken
     */
    JSONWebToken.prototype.verifyJWT = function (token, secret, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.JWT.verify(token, secret, options, function (err, decoded) {
                err ? reject(err) : resolve(decoded);
            });
        });
    };
    return JSONWebToken;
}());
exports.JSONWebToken = JSONWebToken;
exports.jwtInstance = new JSONWebToken(jwt);
