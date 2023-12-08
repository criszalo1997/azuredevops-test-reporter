import { ITestApi } from 'azure-devops-node-api/TestApi';
import { IAzureConfig } from '../../interfaces/IAzureConfig';
import * as TestInterfaces from 'azure-devops-node-api/interfaces/TestInterfaces';
import { AxiosInstance } from 'axios';
export declare function createTestRun(azureClient: ITestApi, axiosClient: AxiosInstance, azureConfig: IAzureConfig): Promise<TestInterfaces.TestRun>;
export declare function setInProgressRun(azureClient: ITestApi, azureConfig: IAzureConfig, testRunId: number): Promise<TestInterfaces.TestRun>;
export declare function setCompletedRun(azureClient: ITestApi, azureConfig: IAzureConfig, testRunId: number): Promise<TestInterfaces.TestRun>;
export declare function getLastTestRunId(azureClient: ITestApi, azureConfig: IAzureConfig): Promise<number>;
