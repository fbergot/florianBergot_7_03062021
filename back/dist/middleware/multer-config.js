"use strict";
exports.__esModule = true;
exports.postMulter = exports.avatarMulter = void 0;
var multer = require("multer");
var mimesTypes = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
var func = function (destination) {
    return {
        destination: function (req, file, callback) {
            callback(null, destination);
        },
        filename: function (req, file, callback) {
            // transform space in _
            var name = file.originalname.split(' ').join('_');
            var extension;
            var createNameWithExtension = '';
            // check mimesTypes
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
};
var storageAvatar = multer.diskStorage(func('imagesAvatar'));
var storagePost = multer.diskStorage(func('imagesPost'));
exports.avatarMulter = multer({ storage: storageAvatar }).single('image');
exports.postMulter = multer({ storage: storagePost }).single('image');
