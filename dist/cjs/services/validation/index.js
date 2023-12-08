"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const schema_validation_1 = require("../../schema-validation");
const validate = (config) => {
    const v = schema_validation_1.azureConfig.validate(config);
    if (v.length > 0) {
        return false;
    }
    return true;
};
exports.validate = validate;
