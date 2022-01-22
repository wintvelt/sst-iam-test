OK {
  authenticationDetails: AuthenticationDetails {
    validationData: {},
    authParameters: {},
    clientMetadata: {},
    username: 'wintvelt@me.com',
    password: 'Passw0rd!'
  },
  cognitoUser: CognitoUser {
    username: 'wintvelt@me.com',
    pool: CognitoUserPool {
      userPoolId: 'eu-central-1_3N6XUNPAn',
      clientId: '1rckvfb8fgkmilfpp541suknu7',
      client: [Client],
      advancedSecurityDataCollectionFlag: true,
      storage: [WindowLocalStorageMock]
    },
    Session: null,
    client: Client {
      endpoint: 'https://cognito-idp.eu-central-1.amazonaws.com/',
      fetchOptions: {}
    },
    signInUserSession: null,
    authenticationFlowType: 'USER_SRP_AUTH',
    storage: WindowLocalStorageMock { _test: 'LocalStorage', _: [Object] },
    keyPrefix: 'CognitoIdentityServiceProvider.1rckvfb8fgkmilfpp541suknu7',
    userDataKey: 'CognitoIdentityServiceProvider.1rckvfb8fgkmilfpp541suknu7.wintvelt@me.com.userData'
  }
}

{
      authenticationDetails: AuthenticationDetails {
        validationData: {},
        authParameters: {},
        clientMetadata: {},
        username: 'wintvelt@me.com',
        password: 'Passw0rd!'
      },
      cognitoUser: CognitoUser {
        username: 'wintvelt@me.com',
        pool: CognitoUserPool {
          userPoolId: 'eu-central-1_3N6XUNPAn',
          clientId: '1rckvfb8fgkmilfpp541suknu7',
          client: [Client],
          advancedSecurityDataCollectionFlag: true,
          storage: Storage {}
        },
        Session: null,
        client: Client {
          endpoint: 'https://cognito-idp.eu-central-1.amazonaws.com/',
          fetchOptions: {}
        },
        signInUserSession: null,
        authenticationFlowType: 'USER_SRP_AUTH',
        storage: Storage {},
        keyPrefix: 'CognitoIdentityServiceProvider.1rckvfb8fgkmilfpp541suknu7',
        userDataKey: 'CognitoIdentityServiceProvider.1rckvfb8fgkmilfpp541suknu7.wintvelt@me.com.userData'
      }
    }