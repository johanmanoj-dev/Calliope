"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public route to submit a message to a portfolio
router.post('/:slug', message_controller_1.submitMessage);
// Protected routes to view and delete inbox messages
router.use(auth_1.requireAuth);
router.get('/', message_controller_1.getInboxMessages);
router.delete('/:id', message_controller_1.deleteMessage);
exports.default = router;
//# sourceMappingURL=message.routes.js.map