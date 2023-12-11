import { createConnection } from './services/azure/connection';
import { setNotExecutedTest, setTestResult } from './services/azure/testResults';
import { createTestRun, getLastTestRunId, setCompletedRun, setInProgressRun, createTestResultAttachment } from './services/azure/testRun';
import { validate } from './services/validation';
import axios from 'axios';
export class AzureTestPlanReporter {
    _config;
    _azureClient;
    _axiosClient;
    testRunId;
    constructor(config) {
        if (!config || !validate(config)) {
            throw new Error('Invalid Azure Test plan configuration');
        }
        this._config = config;
        this._axiosClient = axios.create({
            headers: {
                Authorization: 'Basic ' + Buffer.from(':' + this._config.pat).toString('base64'),
            },
            params: {
                Authorization: 'Basic ' + this._config.pat,
            },
            baseURL: `${this._config.organizationUrl}/${this._config.projectId}/_apis`,
        });
    }
    async init() {
        this._azureClient = await createConnection(this._config);
    }
    async starTestRun() {
        const testRun = await createTestRun(this._azureClient, this._axiosClient, this._config);
        setInProgressRun(this._azureClient, this._config, testRun.id);
        this.testRunId = testRun.id;
        return testRun;
    }
    async sendTestResult(testResult, testRunId) {
        if (!this.testRunId || !testRunId) {
            new Error();
        }
        const officialRunId = testRunId ? testRunId : this.testRunId;
        return await setTestResult(this._azureClient, this._config, officialRunId, testResult);
    }
    async stopTestRun() {
        await setNotExecutedTest(this._azureClient, this._config, this.testRunId);
        const testRun = await setCompletedRun(this._azureClient, this._config, this.testRunId);
        return testRun;
    }
    async getCurrentTestRunId() {
        return await getLastTestRunId(this._azureClient, this._config);
    }
    async uploadAttachmentTestCase(uniTest, runId, attachmentType, comment, fileName, stream) {
        const attachment = {
            attachmentType: attachmentType,
            comment: comment,
            fileName: fileName,
            stream: stream
        };
        const upload = await createTestResultAttachment(this._azureClient, attachment, this._config, runId, uniTest);
        return upload;
    }
}
