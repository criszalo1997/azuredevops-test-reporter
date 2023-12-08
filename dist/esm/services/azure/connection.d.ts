import * as TestApi from 'azure-devops-node-api/TestApi';
import { IAzureConfig } from '../../interfaces/IAzureConfig';
export declare function createConnection(config: IAzureConfig): Promise<TestApi.ITestApi>;
