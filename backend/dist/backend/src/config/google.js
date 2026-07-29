"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleClient = void 0;
const google_auth_library_1 = require("google-auth-library");
const env_1 = require("./env");
exports.googleClient = new google_auth_library_1.OAuth2Client(env_1.config.google.clientId, env_1.config.google.clientSecret, env_1.config.google.callbackUrl);
//# sourceMappingURL=google.js.map