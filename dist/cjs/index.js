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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureTestPlanReporter = void 0;
const connection_1 = require("./services/azure/connection");
const testResults_1 = require("./services/azure/testResults");
const testRun_1 = require("./services/azure/testRun");
const validation_1 = require("./services/validation");
const axios_1 = __importDefault(require("axios"));
class AzureTestPlanReporter {
    constructor(config) {
        if (!config || !(0, validation_1.validate)(config)) {
            throw new Error('Invalid Azure Test plan configuration');
        }
        this._config = config;
        this._axiosClient = axios_1.default.create({
            headers: {
                Authorization: 'Basic ' + Buffer.from(':' + this._config.pat).toString('base64'),
            },
            params: {
                Authorization: 'Basic ' + this._config.pat,
            },
            baseURL: `${this._config.organizationUrl}/${this._config.projectId}/_apis`,
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this._azureClient = yield (0, connection_1.createConnection)(this._config);
        });
    }
    starTestRun() {
        return __awaiter(this, void 0, void 0, function* () {
            const testRun = yield (0, testRun_1.createTestRun)(this._azureClient, this._axiosClient, this._config);
            (0, testRun_1.setInProgressRun)(this._azureClient, this._config, testRun.id);
            this.testRunId = testRun.id;
            return testRun;
        });
    }
    sendTestResult(testResult, testRunId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.testRunId || !testRunId) {
                new Error();
            }
            const officialRunId = testRunId ? testRunId : this.testRunId;
            return yield (0, testResults_1.setTestResult)(this._azureClient, this._config, officialRunId, testResult);
        });
    }
    stopTestRun() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, testResults_1.setNotExecutedTest)(this._azureClient, this._config, this.testRunId);
            const testRun = yield (0, testRun_1.setCompletedRun)(this._azureClient, this._config, this.testRunId);
            return testRun;
        });
    }
    getCurrentTestRunId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, testRun_1.getLastTestRunId)(this._azureClient, this._config);
        });
    }
    uploadAttachmentTestCase(uniTest, runId, attachmentType, comment, fileName, stream) {
        return __awaiter(this, void 0, void 0, function* () {
            const attachment = {
                attachmentType: attachmentType,
                comment: comment,
                fileName: fileName,
                stream: stream
            };
            const upload = yield (0, testRun_1.createTestResultAttachment)(this._azureClient, attachment, this._config, runId, uniTest);
            return upload;
        });
    }
}
exports.AzureTestPlanReporter = AzureTestPlanReporter;
