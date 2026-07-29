"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const response_1 = require("../utils/response");
const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        (0, response_1.sendError)(res, 'Authentication required', 401);
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt.secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        (0, response_1.sendError)(res, 'Invalid or expired token', 401);
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map