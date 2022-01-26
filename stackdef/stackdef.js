module.exports = {
    serviceName: "sst-ms-template",
    nodes: [
        {
            name: "create.js",
            subs: ["POST /users"]
        },
        {
            name: "get.js",
            subs: ["GET /s3test"],
            queries: [
                { serviceName: 'blob-images-dev', name: 'bucket' }
            ]
        },
    ]
}