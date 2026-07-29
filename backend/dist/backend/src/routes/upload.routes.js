"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Protect upload routes
router.use(auth_1.requireAuth);
router.get('/auth', upload_controller_1.getUploadAuth);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map