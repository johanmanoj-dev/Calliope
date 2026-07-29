"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadAuth = void 0;
const nodejs_1 = __importDefault(require("@imagekit/nodejs"));
const env_1 = require("../config/env");
const response_1 = require("../utils/response");
// @ts-ignore — @imagekit/nodejs v7 types differ from actual runtime constructor
const imagekit = new nodejs_1.default({
    publicKey: env_1.config.imagekit.publicKey,
    privateKey: env_1.config.imagekit.privateKey,
    urlEndpoint: env_1.config.imagekit.urlEndpoint,
});
const getUploadAuth = (req, res, next) => {
    try {
        // In v7, getAuthenticationParameters lives on imagekit.helper
        const auth = imagekit.helper ?? imagekit;
        const authParameters = auth.getAuthenticationParameters();
        (0, response_1.sendSuccess)(res, authParameters);
    }
    catch (error) {
        next(error);
    }
};
exports.getUploadAuth = getUploadAuth;
//# sourceMappingURL=upload.controller.js.map