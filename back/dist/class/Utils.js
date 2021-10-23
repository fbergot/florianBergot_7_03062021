"use strict";
exports.__esModule = true;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Normalize port on a number >= 0 from number or string of number
     * @throw if val < 0 or if parseInt(val) === NaN
     * @memberof Utils
     */
    Utils.prototype.normalizePort = function (val) {
        var port;
        if (typeof val === 'string') {
            if (isNaN(parseInt(val, 10))) {
                throw Error("Invalid port: " + val);
            }
            else {
                port = parseInt(val, 10);
            }
        }
        else {
            port = val;
        }
        if (port >= 0) {
            return port;
        }
        throw Error("Invalid port: " + port);
    };
    /**
     * Log message in console when event listening is emit
     * @memberof Utils
     */
    Utils.prototype.logHandler = function (port, server) {
        var address = server.address();
        var bind = typeof address === "string" ? "pipe: " + address : "port: " + port;
        console.log("listening on " + bind);
    };
    /**
     * Middleware for add headers CORS
     * @memberof Utils
     */
    Utils.prototype.setHeadersCORS = function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    };
    return Utils;
}());
var utils = new Utils;
exports["default"] = utils;
