/** @type { import("fastify").FastifySchema } */
export default {
    body: {
        type: "object",
        properties: {
            resourceType: {
                type: "string",
                enum: ["StructureDefinition"]
            }
        },
        required: ["resourceType"]
    }
};