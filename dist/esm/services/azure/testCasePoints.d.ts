import { AxiosInstance } from 'axios';
import { IAzureConfig } from '../../interfaces/IAzureConfig';
export declare function getPoints(axiosClient: AxiosInstance, config: IAzureConfig): Promise<number[]>;
