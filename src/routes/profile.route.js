import getProfile from "#root/controller/profile/getProfile.js";
import uploadProfile from "#root/controller/profile/uploadProfile.js";
import uploadProfileSchema from "#root/schemas/uploadProfile.schema.js";

/**
 * A plugin that provide encapsulated routes
 * @param {import("fastify").FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function profileRoute(fastify, options) {
    fastify.get("/profile", getProfile);
    fastify.post("/profile", {
        schema: uploadProfileSchema
    }, uploadProfile);
}

export default profileRoute;
