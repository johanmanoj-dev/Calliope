"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadAuth = void 0;
const imagekit_1 = __importDefault(require("imagekit"));
const env_1 = require("../config/env");
const response_1 = require("../utils/response");
const imagekit = new imagekit_1.default({
    publicKey: env_1.config.imagekit.publicKey,
    privateKey: env_1.config.imagekit.privateKey,
    urlEndpoint: env_1.config.imagekit.urlEndpoint,
});
const getUploadAuth = (req, res, next) => {
    try {
        const authParameters = imagekit.getAuthenticationParameters();
        (0, response_1.sendSuccess)(res, authParameters);
    }
    catch (error) {
        next(error);
    }
};
exports.getUploadAuth = getUploadAuth;
//# sourceMappingURL=upload.controller.js.map