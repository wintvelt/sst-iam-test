#!/usr/bin/env node

var fs = require("fs");

var AWS = require("aws-sdk");
var AWSCognito = require("amazon-cognito-identity-js");
var apigClientFactory = require("aws-api-gateway-client").default;

const authenticate = async (argv) => {
    var poolData = {
        UserPoolId: argv.userPoolId,
        ClientId: argv.appClientId
    };

    AWS.config.update({ region: argv.cognitoRegion });
    var userPool = new AWSCognito.CognitoUserPool(poolData);

    var userData = {
        Username: argv.username,
        Pool: userPool
    };
    var authenticationData = {
        Username: argv.username,
        Password: argv.password
    };
    var authenticationDetails = new AWSCognito.AuthenticationDetails(
        authenticationData
    );

    var cognitoUser = new AWSCognito.CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                resolve({
                    result: "SUCCESS", 
                    tokens: {
                        idToken: result.getIdToken().getJwtToken(),
                        accessToken: result.getAccessToken().getJwtToken()
                    }
                });
            },
            onFailure: function (err) {
                reject(err.message ? err.message : err);
            },
            newPasswordRequired: function () {
                reject("Given user needs to set a new password");
            },
            mfaRequired: function () {
                reject("MFA is not currently supported");
            },
            customChallenge: function () {
                reject("Custom challenge is not currently supported");
            }
        });
    })
}

function getCredentials(argv, userTokens) {

    var logins = {};
    var idToken = userTokens.idToken;
    var accessToken = userTokens.accessToken;

    logins[
        "cognito-idp." + argv.cognitoRegion + ".amazonaws.com/" + argv.userPoolId
    ] = idToken;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: argv.identityPoolId,
        Logins: logins
    });

    return new Promise((resolve, reject) => {
        AWS.config.credentials.get(function (err) {
            if (err) {
                reject(err.message ? err.message : err);
            }

            resolve();
        });
    })
}

function makeRequest(argv) {
    var apigClient = apigClientFactory.newClient({
        apiKey: argv.apiKey,
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: argv.apiGatewayRegion,
        invokeUrl: argv.invokeUrl
    });

    var params = JSON.parse(argv.params);
    var additionalParams = JSON.parse(argv.additionalParams);

    var body = "";
    if (argv.body?.startsWith("@")) {
        // Body from file
        const bodyFromFile = argv.body.replace(/^@/, "");
        const contentFromFile = fs.readFileSync(bodyFromFile);
        body = JSON.parse(contentFromFile);
    }
    else if (argv.body) {
        body = JSON.parse(argv.body);
    }

    if (argv.accessTokenHeader) {
        const tokenHeader = {};
        tokenHeader[argv.accessTokenHeader] = userTokens.accessToken;
        additionalParams.headers = Object.assign(
            {},
            additionalParams.headers,
            tokenHeader
        );
    }

    return apigClient
        .invokeApi(params, argv.pathTemplate, argv.method, additionalParams, body)
}

const apiCall = async (promise) => {
    try {
        const data = await promise
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}

export const auth = async (authParams) => {
    const [err1, response] = await apiCall(authenticate(authParams))
    const { tokens } = response
    if (err1) return [err1, null]
    const [err2, _] = await apiCall(getCredentials(authParams, tokens))
    if (err2) return [err2, null]
    return [null, tokens]
}
export const callAuthApi = async (apiParams) => {
    const [err, result] = await apiCall(makeRequest(apiParams))
    if (err) return [err, null]
    return [null, {
        status: result.status,
        statusText: result.statusText,
        data: result.data
    }]
}