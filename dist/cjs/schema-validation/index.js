"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.azureConfig = void 0;
const validate_1 = __importDefault(require("validate"));
exports.azureConfig = new validate_1.default({
    pat: {
        type: String,
        required: true,
        length: 52,
    },
    organizationUrl: {
        type: String,
        required: false,
    },
    projectId: {
        type: String,
        required: true,
    },
    planId: {
        type: Number,
        required: true,
    },
    suiteId: {
        type: Number,
        required: true,
    },
    runName: {
        type: String,
        required: false,
    },
    caseIdRegex: {
        type: String,
        required: false,
    },
});
