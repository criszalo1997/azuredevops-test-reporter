import { RunCreateModel } from '../../model/runCreateModel';
import { getPoints } from './testCasePoints';
export async function createTestRun(azureClient, axiosClient, azureConfig) {
    const plan = {
        id: `${azureConfig.planId}`,
        name: azureConfig.runName,
    };
    const pointIds = await getPoints(axiosClient, azureConfig);
    const testRunModel = new RunCreateModel(azureConfig.runName, plan, pointIds);
    return azureClient.createTestRun(testRunModel, azureConfig.projectId);
}
export async function setInProgressRun(azureClient, azureConfig, testRunId) {
    const inProgressRunModel = {
        state: 'InProgress',
    };
    return azureClient.updateTestRun(inProgressRunModel, azureConfig.projectId, testRunId);
}
export async function setCompletedRun(azureClient, azureConfig, testRunId) {
    const inProgressRunModel = {
        state: 'Completed',
    };
    return azureClient.updateTestRun(inProgressRunModel, azureConfig.projectId, testRunId);
}
export async function getLastTestRunId(azureClient, azureConfig) {
    const testRun = await azureClient.getTestRuns(azureConfig.projectId, undefined, undefined, undefined, azureConfig.planId, undefined, undefined, undefined);
    if (!testRun || !testRun.length) {
        throw new Error();
    }
    testRun.sort((a, b) => a.id - b.id);
    return testRun[testRun.length - 1].id;
}
