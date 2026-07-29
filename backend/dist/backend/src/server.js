"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const start = async () => {
    // Start HTTP server first — health route works even before DB connects
    app_1.default.listen(env_1.config.port, () => {
        console.log(`🚀 Server running on http://localhost:${env_1.config.port} [${env_1.config.nodeEnv}]`);
    });
    // DB connection is non-blocking for the server itself
    try {
        await (0, db_1.connectDB)();
    }
    catch {
        console.warn('⚠️  Started without DB — fill in MONGODB_URI in .env');
    }
};
start();
//# sourceMappingURL=server.js.map