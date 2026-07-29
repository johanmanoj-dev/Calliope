"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateThemePreference = exports.updateProfilePicture = exports.getMe = exports.logout = exports.googleCallback = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const Portfolio_1 = require("../models/Portfolio");
const Message_1 = require("../models/Message");
const googleCallback = async (req, res, next) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            (0, response_1.sendError)(res, 'Google credential token is missing', 400);
            return;
        }
        const payload = await (0, auth_service_1.verifyGoogleToken)(credential);
        const user = await (0, auth_service_1.findOrCreateUser)(payload);
        const token = (0, auth_service_1.generateSessionToken)(user);
        const isProd = env_1.config.nodeEnv === 'production';
        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        (0, response_1.sendSuccess)(res, {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                themePreference: user.themePreference,
            }
        }, 'Authentication successful');
    }
    catch (error) {
        next(error);
    }
};
exports.googleCallback = googleCallback;
const logout = (req, res) => {
    res.clearCookie('token');
    (0, response_1.sendSuccess)(res, null, 'Logged out successfully');
};
exports.logout = logout;
const getMe = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await User_1.User.findById(userId).select('-__v');
        if (!user) {
            (0, response_1.sendError)(res, 'User not found', 404);
            return;
        }
        (0, response_1.sendSuccess)(res, { user });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
const updateProfilePicture = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { profilePicture } = req.body;
        if (!profilePicture) {
            (0, response_1.sendError)(res, 'profilePicture is required', 400);
            return;
        }
        const user = await User_1.User.findByIdAndUpdate(userId, { profilePicture }, { new: true }).select('-__v');
        if (!user) {
            (0, response_1.sendError)(res, 'User not found', 404);
            return;
        }
        (0, response_1.sendSuccess)(res, { user }, 'Profile picture updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfilePicture = updateProfilePicture;
const updateThemePreference = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { themePreference } = req.body;
        if (!themePreference || !['light', 'dark'].includes(themePreference)) {
            (0, response_1.sendError)(res, 'Invalid themePreference', 400);
            return;
        }
        const user = await User_1.User.findByIdAndUpdate(userId, { themePreference }, { new: true }).select('-__v');
        if (!user) {
            (0, response_1.sendError)(res, 'User not found', 404);
            return;
        }
        (0, response_1.sendSuccess)(res, { user }, 'Theme preference updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateThemePreference = updateThemePreference;
const deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await User_1.User.findById(userId);
        if (!user) {
            (0, response_1.sendError)(res, 'User not found', 404);
            return;
        }
        // Delete portfolio owned by this user
        await Portfolio_1.Portfolio.deleteOne({ ownerId: user._id.toString() });
        // Delete all contact messages sent to this user's portfolio
        await Message_1.Message.deleteMany({ portfolioOwnerId: user._id.toString() });
        // Delete the user record
        await User_1.User.findByIdAndDelete(userId);
        // Clear the session cookie
        res.clearCookie('token');
        (0, response_1.sendSuccess)(res, null, 'Account deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=auth.controller.js.map