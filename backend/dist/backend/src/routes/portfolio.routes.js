"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public route
router.get('/public/:slug', portfolio_controller_1.getPublicPortfolio);
// Protect all other portfolio routes
router.use(auth_1.requireAuth);
router.get('/me', portfolio_controller_1.getMyPortfolio);
router.post('/', portfolio_controller_1.createPortfolio);
router.put('/:id', portfolio_controller_1.updatePortfolio);
router.post('/:id/publish', portfolio_controller_1.publishPortfolio);
exports.default = router;
//# sourceMappingURL=portfolio.routes.js.map