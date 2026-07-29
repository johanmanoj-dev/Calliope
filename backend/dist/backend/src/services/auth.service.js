"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSessionToken = exports.findOrCreateUser = exports.verifyGoogleToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_1 = require("../config/google");
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const verifyGoogleToken = async (idToken) => {
    const ticket = await google_1.googleClient.verifyIdToken({
        idToken,
        audience: env_1.config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
        throw new Error('Invalid Google token');
    }
    return payload;
};
exports.verifyGoogleToken = verifyGoogleToken;
const findOrCreateUser = async (googlePayload) => {
    const { sub: googleId, email, name, picture: profilePicture } = googlePayload;
    let user = await User_1.User.findOne({ googleId });
    if (!user) {
        // If not found by googleId, check if email exists (edge case)
        user = await User_1.User.findOne({ email });
        if (user) {
            user.googleId = googleId;
            await user.save();
        }
        else {
            user = await User_1.User.create({
                googleId,
                email,
                name,
                profilePicture,
            });
        }
    }
    else {
        const isCustomPfp = user.profilePicture && !user.profilePicture.includes('googleusercontent.com');
        let hasChanges = false;
        if (!isCustomPfp && profilePicture && user.profilePicture !== profilePicture) {
            user.profilePicture = profilePicture;
            hasChanges = true;
        }
        if (name && user.name !== name) {
            user.name = name;
            hasChanges = true;
        }
        if (hasChanges) {
            await user.save();
        }
    }
    return user;
};
exports.findOrCreateUser = findOrCreateUser;
const generateSessionToken = (user) => {
    const payload = {
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
    };
    return jsonwebtoken_1.default.sign(payload, env_1.config.jwt.secret, {
        expiresIn: env_1.config.jwt.expiresIn,
    });
};
exports.generateSessionToken = generateSessionToken;
//# sourceMappingURL=auth.service.js.map