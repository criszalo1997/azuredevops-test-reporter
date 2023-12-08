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
exports.setNotExecutedTest = exports.setTestResult = void 0;
function _getTestsInRun(azureClient, azureConfig, testRunId) {
    return __awaiter(this, void 0, void 0, function* () {
        return azureClient.getTestResults(azureConfig.projectId, testRunId);
    });
}
function setTestResult(azureClient, azureConfig, testRunId, testResult) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!azureClient || !Object.keys(azureClient).length) {
            throw new Error('Missing valid Azure Devops client');
        }
        if (!testRunId) {
            throw new Error(`no testRunId provided`);
        }
        const testsInRun = yield _getTestsInRun(azureClient, azureConfig, testRunId);
        if (!testsInRun.length) {
            throw new Error(`no tests founded in testRun with id ${testRunId}`);
        }
        const updatedResult = testsInRun.filter((test) => {
            var _a;
            if (((_a = test.testCase) === null || _a === void 0 ? void 0 : _a.id) === testResult.testCaseId) {
                test.outcome = testResult.result;
                test.comment = testResult.message;
                test.state = 'Completed';
                return test;
            }
        });
        return azureClient.updateTestResults(updatedResult, azureConfig.projectId, testRunId);
    });
}
exports.setTestResult = setTestResult;
function setNotExecutedTest(azureClient, azureConfig, testRunId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!azureClient || !Object.keys(azureClient).length) {
            throw new Error('Missing valid Azure Devops client');
        }
        if (!testRunId) {
            throw new Error(`no testRunId provided`);
        }
        const testsInRun = yield _getTestsInRun(azureClient, azureConfig, testRunId);
        if (!testsInRun.length) {
            throw new Error(`no tests founded in testRun with id ${testRunId}`);
        }
        const updatedResult = testsInRun.filter((test) => {
            if (!test.outcome) {
                test.outcome = 'NotApplicable';
                test.state = 'Completed';
            }
            return test;
        });
        return azureClient.updateTestResults(updatedResult, azureConfig.projectId, testRunId);
    });
}
exports.setNotExecutedTest = setNotExecutedTest;
