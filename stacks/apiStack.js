import * as sst from "@serverless-stack/resources";
import * as cdk from "aws-cdk-lib"
import { DomainName } from "@aws-cdk/aws-apigatewayv2-alpha"

const routeNames = {
    put: "POST   /users",
}

const envProps = (env) => ({
    SECRET_PUBLISH_TOKEN: env.SECRET_PUBLISH_TOKEN,
    STAGE: env.STAGE,
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1
})

export default class ApiStack extends sst.Stack {
    // Public reference to the API
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        // Create the API
        this.api = new sst.Api(this, "api", {
            defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
            // customDomain: {
            //     domainName: DomainName.fromDomainNameAttributes(this, "MyDomain", {
            //         name: 'api-dev.clubalmanac.com',
            //     }),
            //     path: 'v2'
            // },
            // does not work - old domain = edge, which does not mix with new v2 http gateway
            customDomain: {
                domainName: "apiv2-dev.clubalmanac.com",
                hostedZone: "clubalmanac.com",
            },
            routes: {
                [routeNames.put]: new sst.Function(this, "postHandler", {
                    handler: "src/create.handler",
                    environment: envProps(process.env),
                }),
            },
        });

        this.getAllFunctions().forEach(fn =>
            cdk.Tags.of(fn).add("lumigo:auto-trace", "true")
        )

        const outputs = {
            "url": this.api.url,
        }

        // Show the API endpoint in the output
        this.addOutputs(outputs);
    }
}