"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.getInboxMessages = exports.submitMessage = void 0;
const Message_1 = require("../models/Message");
const Portfolio_1 = require("../models/Portfolio");
const response_1 = require("../utils/response");
const submitMessage = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { visitorName, visitorContact, message, honeypot } = req.body;
        // Basic honeypot spam protection
        if (honeypot) {
            // Spam bot filled in the hidden field, pretend success
            (0, response_1.sendSuccess)(res, null, 'Message sent successfully', 201);
            return;
        }
        const portfolio = await Portfolio_1.Portfolio.findOne({ slug, isPublished: true });
        if (!portfolio) {
            (0, response_1.sendError)(res, 'Portfolio not found', 404);
            return;
        }
        const newMessage = await Message_1.Message.create({
            portfolioOwnerId: portfolio.ownerId,
            visitorName,
            visitorContact,
            message,
            submittedAt: new Date(),
        });
        (0, response_1.sendSuccess)(res, null, 'Message sent successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.submitMessage = submitMessage;
const getInboxMessages = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        // Sort by newest first
        const messages = await Message_1.Message.find({ portfolioOwnerId: userId })
            .sort({ submittedAt: -1 })
            .select('-__v');
        (0, response_1.sendSuccess)(res, { messages });
    }
    catch (error) {
        next(error);
    }
};
exports.getInboxMessages = getInboxMessages;
const deleteMessage = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const message = await Message_1.Message.findOneAndDelete({ _id: id, portfolioOwnerId: userId });
        if (!message) {
            (0, response_1.sendError)(res, 'Message not found', 404);
            return;
        }
        (0, response_1.sendSuccess)(res, null, 'Message deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMessage = deleteMessage;
//# sourceMappingURL=message.controller.js.map