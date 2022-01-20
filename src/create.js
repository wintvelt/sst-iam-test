// handler for PUT route
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import validator from '@middy/validator'
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors'
import { inputSchema } from './libs/create-input-schema'

const baseHandler = async (event) => {
    const { sender } = event.body;

    return {
        statusCode: 200,
        body: `hello from the cloud to ${sender}`
    }
}

const handler = middy(baseHandler)
    .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
    .use(validator({ inputSchema })) // validates the input
    .use(cors())
    .use(httpErrorHandler({ fallbackMessage: 'server error' }))

// module exports
module.exports = { handler }