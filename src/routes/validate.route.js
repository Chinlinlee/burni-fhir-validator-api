import validateResource from "#root/controller/validate/postValidate.js";
import validateSchema from "#root/schemas/validate.schema.js";

/**
 * A plugin that provide encapsulated routes
 * @param {import("fastify").FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function validateRoute(fastify, options) {
    fastify.post("/validate", {
        schema: validateSchema
    }, validateResource);
}

export default validateRoute;
