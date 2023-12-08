import { ITestApi } from 'azure-devops-node-api/TestApi';
import { IAzureConfig } from '../../interfaces/IAzureConfig';
import * as TestInterfaces from 'azure-devops-node-api/interfaces/TestInterfaces';
import { ITestResult } from '../../interfaces/ITestResult';
export declare function setTestResult(azureClient: ITestApi, azureConfig: IAzureConfig, testRunId: number, testResult: ITestResult): Promise<TestInterfaces.TestCaseResult[]>;
export declare function setNotExecutedTest(azureClient: ITestApi, azureConfig: IAzureConfig, testRunId: number): Promise<TestInterfaces.TestCaseResult[]>;
