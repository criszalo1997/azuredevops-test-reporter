import * as azdev from 'azure-devops-node-api';
export async function createConnection(config) {
    const authHandler = azdev.getPersonalAccessTokenHandler(config.pat);
    const connection = new azdev.WebApi(config.organizationUrl, authHandler);
    const testApiClient = await connection.getTestApi();
    return testApiClient;
}
