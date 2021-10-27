"use strict";
exports.__esModule = true;
var multer = require("multer");
var mimesTypes = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
var options = {
    destination: function (req, file, callback) {
        callback(null, 'images');
    },
    filename: function (req, file, callback) {
        // transform space in _
        var name = file.originalname.split(' ').join('_');
        var extension;
        var createNameWithExtension = '';
        if (file.mimetype in mimesTypes) {
            extension = mimesTypes[file.mimetype];
            createNameWithExtension = "" + name + Date.now() + "." + extension;
            callback(null, createNameWithExtension);
        }
        else {
            callback(new Error('Bad mimetype'), "");
        }
    }
};
var storage = multer.diskStorage(options);
exports["default"] = multer({ storage: storage }).single('image');
