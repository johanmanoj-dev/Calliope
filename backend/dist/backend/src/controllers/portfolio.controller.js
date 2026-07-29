"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicPortfolio = exports.publishPortfolio = exports.updatePortfolio = exports.createPortfolio = exports.getMyPortfolio = void 0;
const Portfolio_1 = require("../models/Portfolio");
const User_1 = require("../models/User");
const response_1 = require("../utils/response");
const getMyPortfolio = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const portfolio = await Portfolio_1.Portfolio.findOne({ ownerId: userId }).select('-__v');
        (0, response_1.sendSuccess)(res, { portfolio });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyPortfolio = getMyPortfolio;
const createPortfolio = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const existingPortfolio = await Portfolio_1.Portfolio.findOne({ ownerId: userId });
        if (existingPortfolio) {
            (0, response_1.sendError)(res, 'Portfolio already exists', 400);
            return;
        }
        const portfolio = await Portfolio_1.Portfolio.create({
            ownerId: userId,
            hero: {},
            about: {},
            skills: [],
            projects: [],
            education: [],
            experience: [],
            contact: {},
            socialLinks: [],
        });
        // Link portfolio to user
        await User_1.User.findByIdAndUpdate(userId, { portfolioRef: portfolio._id });
        (0, response_1.sendSuccess)(res, { portfolio }, 'Portfolio created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createPortfolio = createPortfolio;
const updatePortfolio = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        // Validate that the portfolio belongs to the user
        const portfolio = await Portfolio_1.Portfolio.findOne({ _id: id, ownerId: userId });
        if (!portfolio) {
            (0, response_1.sendError)(res, 'Portfolio not found', 404);
            return;
        }
        // Partial update using the $set operator via findByIdAndUpdate
        // We pass req.body directly, but in a real app we'd validate the structure with Zod here.
        const updatedPortfolio = await Portfolio_1.Portfolio.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true }).select('-__v');
        (0, response_1.sendSuccess)(res, { portfolio: updatedPortfolio });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePortfolio = updatePortfolio;
const publishPortfolio = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const portfolio = await Portfolio_1.Portfolio.findOne({ _id: id, ownerId: userId });
        if (!portfolio) {
            (0, response_1.sendError)(res, 'Portfolio not found', 404);
            return;
        }
        if (portfolio.isPublished && portfolio.slug) {
            (0, response_1.sendSuccess)(res, { portfolio }, 'Portfolio already published');
            return;
        }
        const { generateSlugWithFallback } = await Promise.resolve().then(() => __importStar(require('../utils/generateSlug')));
        const baseSlug = generateSlugWithFallback(portfolio.hero?.name || 'portfolio');
        let slug = baseSlug;
        let counter = 1;
        let isUnique = false;
        while (!isUnique) {
            const existing = await Portfolio_1.Portfolio.findOne({ slug });
            if (existing) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
            else {
                isUnique = true;
            }
        }
        const publishedUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/p/${slug}`;
        const updatedPortfolio = await Portfolio_1.Portfolio.findByIdAndUpdate(id, { isPublished: true, slug, publishedUrl }, { new: true });
        (0, response_1.sendSuccess)(res, { portfolio: updatedPortfolio }, 'Portfolio published successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.publishPortfolio = publishPortfolio;
const getPublicPortfolio = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const portfolio = await Portfolio_1.Portfolio.findOne({ slug, isPublished: true }).select('-__v');
        if (!portfolio) {
            (0, response_1.sendError)(res, 'Portfolio not found', 404);
            return;
        }
        (0, response_1.sendSuccess)(res, { portfolio });
    }
    catch (error) {
        next(error);
    }
};
exports.getPublicPortfolio = getPublicPortfolio;
//# sourceMappingURL=portfolio.controller.js.map