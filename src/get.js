// handler for PUT route
import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors'
import { getUserFromEvent } from 'blob-common/core/handler'
import { s3 } from 'blob-common/core/s3'

const apiCall = async (promise) => {
    try {
        return [null, await promise]
    } catch (error) {
        return [error, null]
    }
}

const baseHandler = async (event) => {
    const userId = getUserFromEvent(event);
    const params = {
        Key: `protected/${userId.slice(1)}/20201110-135018-foto-met-exif.jpg`,
        Bucket: 'blob-images-dev'
    }
    console.log(params)
    const [err, res] = await apiCall(s3.getMetadata(params))
    if (err) {
        console.error(err)
        throw new Error(err)
    }
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}

const handler = middy(baseHandler)
    .use(cors())
    .use(httpErrorHandler({ fallbackMessage: 'server error' }))

// module exports
module.exports = { handler }