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
exports.Portfolio = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const HeroSchema = new mongoose_1.Schema({
    photoUrl: { type: String, default: '' },
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    introduction: { type: String, default: '' },
    location: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
});
const AboutSchema = new mongoose_1.Schema({
    personalIntro: { type: String, default: '' },
    careerInterests: { type: String, default: '' },
    professionalGoals: { type: String, default: '' },
    areasOfExpertise: { type: String, default: '' },
    biography: { type: String, default: '' },
});
const SkillSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
});
const ProjectSchema = new mongoose_1.Schema({
    thumbnailUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    sourceLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
});
const EducationSchema = new mongoose_1.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, default: '' },
});
const ExperienceSchema = new mongoose_1.Schema({
    organization: { type: String, required: true },
    position: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, default: '' },
});
const ContactSchema = new mongoose_1.Schema({
    email: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    website: { type: String, default: '' },
    other: [{ type: String }],
});
const ThemeSettingsSchema = new mongoose_1.Schema({
    bgColor: { type: String, default: '#F2EAE0' },
    cardBgColor: { type: String, default: 'rgba(255, 255, 255, 0.92)' },
    textColor: { type: String, default: '#1E293B' },
    accentColor: { type: String, default: '#7C3AED' },
    fontFamily: { type: String, default: 'Plus Jakarta Sans' },
    isBoldText: { type: Boolean, default: false },
    fieldStyles: { type: mongoose_1.Schema.Types.Mixed, default: {} },
});
const PortfolioSchema = new mongoose_1.Schema({
    ownerId: { type: String, required: true, unique: true }, // Links to User.googleId or User._id
    hero: { type: HeroSchema, default: () => ({}) },
    about: { type: AboutSchema, default: () => ({}) },
    skills: { type: [SkillSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    experience: { type: [ExperienceSchema], default: [] },
    contact: { type: ContactSchema, default: () => ({}) },
    socialLinks: { type: [String], default: [] },
    themeSettings: { type: ThemeSettingsSchema, default: () => ({}) },
    slug: { type: String, sparse: true, unique: true },
    isPublished: { type: Boolean, default: false },
    publishedUrl: { type: String },
}, { timestamps: true });
exports.Portfolio = mongoose_1.default.model('Portfolio', PortfolioSchema);
//# sourceMappingURL=Portfolio.js.map