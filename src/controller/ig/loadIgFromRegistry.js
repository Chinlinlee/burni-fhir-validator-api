import { app } from "#root/app.js";
import { packageClient } from "#root/fhir-package-client.js";
import globalFhirValidator from "#root/fhir-validator-loader.js";

/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function loadIgFromRegistry(req, res) {
    try {
        await globalFhirValidator.validator.loadIg(req.body.id, req.body.version);
        res.code(200).send();
    } catch (e) {
        app.log.error(e);

        if (e.message.includes("Unable to resolve package")) {
            return res.code(404).send({
                statusCode: 404,
                error: "Not Found",
                message: `${req.body.id}#${req.body.version} Not Found`
            });
        }

        throw new Error("500 Internal Server Error");
    }
}

export default loadIgFromRegistry;

