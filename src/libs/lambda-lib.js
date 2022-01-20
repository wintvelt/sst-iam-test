import AWS from "aws-sdk"
import { apiCall } from "./promise-lib"

const lambdaFunc = new AWS.Lambda()

export const lambda = {
    invoke: (params) => apiCall(lambdaFunc.invoke(params).promise())
}