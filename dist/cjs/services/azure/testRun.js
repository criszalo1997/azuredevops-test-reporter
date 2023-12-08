"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastTestRunId = exports.setCompletedRun = exports.setInProgressRun = exports.createTestRun = void 0;
const runCreateModel_1 = require("../../model/runCreateModel");
const testCasePoints_1 = require("./testCasePoints");
function createTestRun(azureClient, axiosClient, azureConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const plan = {
            id: `${azureConfig.planId}`,
            name: azureConfig.runName,
        };
        const pointIds = yield (0, testCasePoints_1.getPoints)(axiosClient, azureConfig);
        const testRunModel = new runCreateModel_1.RunCreateModel(azureConfig.runName, plan, pointIds);
        return azureClient.createTestRun(testRunModel, azureConfig.projectId);
    });
}
exports.createTestRun = createTestRun;
function setInProgressRun(azureClient, azureConfig, testRunId) {
    return __awaiter(this, void 0, void 0, function* () {
        const inProgressRunModel = {
            state: 'InProgress',
        };
        return azureClient.updateTestRun(inProgressRunModel, azureConfig.projectId, testRunId);
    });
}
exports.setInProgressRun = setInProgressRun;
function setCompletedRun(azureClient, azureConfig, testRunId) {
    return __awaiter(this, void 0, void 0, function* () {
        const inProgressRunModel = {
            state: 'Completed',
        };
        return azureClient.updateTestRun(inProgressRunModel, azureConfig.projectId, testRunId);
    });
}
exports.setCompletedRun = setCompletedRun;
function getLastTestRunId(azureClient, azureConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const testRun = yield azureClient.getTestRuns(azureConfig.projectId, undefined, undefined, undefined, azureConfig.planId, undefined, undefined, undefined);
        if (!testRun || !testRun.length) {
            throw new Error();
        }
        testRun.sort((a, b) => a.id - b.id);
        return testRun[testRun.length - 1].id;
    });
}
exports.getLastTestRunId = getLastTestRunId;
