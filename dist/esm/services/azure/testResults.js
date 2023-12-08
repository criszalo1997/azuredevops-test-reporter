async function _getTestsInRun(azureClient, azureConfig, testRunId) {
    return azureClient.getTestResults(azureConfig.projectId, testRunId);
}
export async function setTestResult(azureClient, azureConfig, testRunId, testResult) {
    if (!azureClient || !Object.keys(azureClient).length) {
        throw new Error('Missing valid Azure Devops client');
    }
    if (!testRunId) {
        throw new Error(`no testRunId provided`);
    }
    const testsInRun = await _getTestsInRun(azureClient, azureConfig, testRunId);
    if (!testsInRun.length) {
        throw new Error(`no tests founded in testRun with id ${testRunId}`);
    }
    const updatedResult = testsInRun.filter((test) => {
        if (test.testCase?.id === testResult.testCaseId) {
            test.outcome = testResult.result;
            test.comment = testResult.message;
            test.state = 'Completed';
            return test;
        }
    });
    return azureClient.updateTestResults(updatedResult, azureConfig.projectId, testRunId);
}
export async function setNotExecutedTest(azureClient, azureConfig, testRunId) {
    if (!azureClient || !Object.keys(azureClient).length) {
        throw new Error('Missing valid Azure Devops client');
    }
    if (!testRunId) {
        throw new Error(`no testRunId provided`);
    }
    const testsInRun = await _getTestsInRun(azureClient, azureConfig, testRunId);
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
}
