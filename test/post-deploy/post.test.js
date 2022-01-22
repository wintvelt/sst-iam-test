/**
 * @jest-environment node
 */
//  This is needed to make the cognito authorization work in Jest
import { auth, callAuthApi } from '../../src/libs/cognito-api-test-lib';

const authParams = {
    // voor authenticate en getCredentials
    username: 'wintvelt@me.com',
    password: 'Passw0rd!',
    userPoolId: 'eu-central-1_3N6XUNPAn',
    appClientId: '1rckvfb8fgkmilfpp541suknu7',
    cognitoRegion: 'eu-central-1',
    identityPoolId: 'eu-central-1:26957302-975e-4f3e-ba2f-6a10e9030518'
}
const apiParams = {
    // voor makeRequest
    invokeUrl: 'https://6uje6v0pqi.execute-api.eu-central-1.amazonaws.com',
    apiKey: '',
    apiGatewayRegion: 'eu-central-1',
    pathTemplate: '/',
    method: 'POST',
    body: '{"sender":"bash"}',
    params: "{}",
    additionalParams: "{}"
}

test('new try', async () => {
    const [err, tokens] = await auth(authParams)
    expect(err).toBeNull()
    
    const [err1, result] = await callAuthApi({ ...apiParams, tokens })
    expect(err1).toBeNull()
    expect(result.status).toBe(200)
})