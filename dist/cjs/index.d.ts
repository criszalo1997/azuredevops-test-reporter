import { TestCaseResult, TestRun, TestAttachmentReference } from 'azure-devops-node-api/interfaces/TestInterfaces';
import { IAzureConfig } from './interfaces/IAzureConfig';
import { IAzureTestPlanReporter } from './interfaces/IAzureTestPlanReporter';
import { ITestResult } from './interfaces/ITestResult';
export declare class AzureTestPlanReporter implements IAzureTestPlanReporter {
    private _config;
    private _azureClient;
    private _axiosClient;
    testRunId: number;
    constructor(config: IAzureConfig);
    init(): Promise<void>;
    starTestRun(): Promise<TestRun>;
    sendTestResult(testResult: ITestResult, testRunId?: number): Promise<TestCaseResult[]>;
    stopTestRun(): Promise<TestRun>;
    getCurrentTestRunId(): Promise<number>;
    uploadAttachmentTestCase(uniTest: number, runId: number, attachmentType: string, comment: string, fileName: string, stream: string): Promise<TestAttachmentReference>;
}
