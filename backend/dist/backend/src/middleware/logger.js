"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        if (process.env.NODE_ENV !== 'test') {
            console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
        }
    });
    next();
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map