import * as TestInterfaces from 'azure-devops-node-api/interfaces/TestInterfaces';
export declare class RunCreateModel implements TestInterfaces.RunCreateModel {
    automated: boolean;
    configurationIds: number[];
    name: string;
    plan: TestInterfaces.ShallowReference;
    pointIds?: number[] | undefined;
    constructor(name: string, plan: TestInterfaces.ShallowReference, pointIds: number[]);
}
