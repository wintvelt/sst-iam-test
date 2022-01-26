import * as iam from "aws-cdk-lib/aws-iam";

export const s3Permissions = (arn) => [
    new iam.PolicyStatement({
        actions: [
            "s3:GetObject",
            "s3:ListBucket"
        ],
        effect: iam.Effect.ALLOW,
        resources: [
            arn,
        ],
    }),
]