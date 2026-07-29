"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/google', auth_controller_1.googleCallback);
router.post('/logout', auth_1.requireAuth, auth_controller_1.logout);
router.get('/me', auth_1.requireAuth, auth_controller_1.getMe);
router.patch('/profile-picture', auth_1.requireAuth, auth_controller_1.updateProfilePicture);
router.patch('/theme', auth_1.requireAuth, auth_controller_1.updateThemePreference);
router.delete('/account', auth_1.requireAuth, auth_controller_1.deleteAccount);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map