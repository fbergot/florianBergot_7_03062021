"use strict";
var _a, _b;
exports.__esModule = true;
exports.postMulter = exports.avatarMulter = void 0;
var multer = require("multer");
var dotenv = require("dotenv");
dotenv.config();
var mimesTypes = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
/**
 * Create multer options object
 */
var buildOptions = function (destination) {
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
var destUserAvatars = (_a = process.env.DEST_USERS_IMAGES) !== null && _a !== void 0 ? _a : "avatars_images";
var destPostsAttachments = (_b = process.env.DEST_POSTS_ATTACHMENTS) !== null && _b !== void 0 ? _b : "posts_attachments";
var storageAvatar = multer.diskStorage(buildOptions(destUserAvatars));
var storagePost = multer.diskStorage(buildOptions(destPostsAttachments));
exports.avatarMulter = multer({ storage: storageAvatar }).single('image');
exports.postMulter = multer({ storage: storagePost }).single('image');
