/** @type { import("fastify").FastifySchema } */
export default {
    body: {
        type: "object",
        properties: {
            id: {
                type: "string"
            },
            version: {
                type: "string"
            }
        },
        required: ["id", "version"]
    }
};