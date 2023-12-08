"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunCreateModel = void 0;
class RunCreateModel {
    constructor(name, plan, pointIds) {
        this.automated = true;
        this.configurationIds = [];
        this.name = name;
        this.plan = plan;
        this.pointIds = pointIds;
    }
}
exports.RunCreateModel = RunCreateModel;
