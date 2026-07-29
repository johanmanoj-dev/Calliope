"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const logger_1 = require("./middleware/logger");
// Route imports (will be added in later phases)
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const portfolio_routes_1 = __importDefault(require("./routes/portfolio.routes"));
// import projectRoutes from './routes/project.routes';
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const app = (0, express_1.default)();
app.use(logger_1.logger);
// ── Security ──────────────────────────────────────────────
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// ── Parsing ───────────────────────────────────────────────
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// ── Logging ───────────────────────────────────────────────
if (env_1.config.nodeEnv !== 'test') {
    app.use((0, morgan_1.default)('dev'));
}
// ── Health Check ──────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: env_1.config.nodeEnv,
    });
});
// ── API Routes ────────────────────────────────────────────
app.use('/api/auth', auth_routes_1.default);
app.use('/api/portfolio', portfolio_routes_1.default);
// app.use('/api/projects', projectRoutes);
app.use('/api/messages', message_routes_1.default);
app.use('/api/upload', upload_routes_1.default);
// ── Error Handling ────────────────────────────────────────
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map