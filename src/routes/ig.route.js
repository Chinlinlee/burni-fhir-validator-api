import * as R from "remeda";

import getIg from "#root/controller/ig/getIg.js";

import uploadIg from "#root/controller/ig/uploadIg.js";
import uploadIgSchema from "#root/schemas/uploadIg.schema.js";
import uploadIgMiddleware from "#root/controller/ig/middleware/uploadIg.middleware.js";


import getIgFromRegistry from "#root/controller/ig/getIgFromRegistry.js";
import loadIgFromRegistry from "#root/controller/ig/loadIgFromRegistry.js";
import loadIgFromRegistrySchema from "#root/schemas/loadIgFromRegistry.schema.js";
import getIgVersion from "#root/controller/ig/getIgVersion.js";


/**
 * A plugin that provide encapsulated routes
 * @param {import("fastify").FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function igRoute(fastify, options) {

    fastify.decorateRequest("local", null);

    fastify.addHook("onRequest", function(req, reply, done) {
        req.local = R.pipe(
            req.local,
            R.set("local", {}),
            R.set("igFilenames", [])
        );
        done();
    });

    fastify.get("/igs", getIg);
    fastify.get("/igs/:igName", getIgVersion)
    fastify.post("/igs", {
        schema: uploadIgSchema,
        preHandler: uploadIgMiddleware
    }, uploadIg);

    fastify.get("/igs/from-registry", getIgFromRegistry);
    fastify.post("/igs/from-registry", {
        schema: loadIgFromRegistrySchema
    }, loadIgFromRegistry)
}

export default igRoute;
