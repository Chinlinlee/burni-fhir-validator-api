/** @type { import("fastify").FastifySchema } */
export default {
    body: {
        type: "object",
        properties: {
            fields: {
                type: "object"
            },
            files: {
                type: "array",
                items: {
                    type: "object"
                },
                minItems: 1
            }
        },
        required: ["files"],
    },
    openapi: {
        consumes: ["multipart/form-data"]
    },
    consumes: ["multipart/form-data"]
};