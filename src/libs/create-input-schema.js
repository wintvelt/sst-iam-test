// input validation schema for create.js, createAsync.js and queueConsumer.js
export const inputSchema = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                sender: { type: 'string' }
            },
            required: ['sender']
        }
    }
}