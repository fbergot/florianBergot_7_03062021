"use strict";
exports.__esModule = true;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.normalizePort = function (val) {
        var port;
        if (typeof val === 'string') {
            if (isNaN(parseInt(val, 10))) {
                throw Error("Invalid port");
            }
            else {
                port = parseInt(val, 10);
            }
        }
        else {
            port = val;
        }
        if (port && port >= 0) {
            return port;
        }
        throw Error('Invalid port');
    };
    Utils.prototype.logHandler = function (port, server) {
        var address = server ? server.address() : undefined;
        var bind = typeof address === "string" ? "pipe: " + address : "port: " + (port ? port : "invalid");
        console.log("listening on " + bind);
    };
    return Utils;
}());
exports["default"] = Utils;
