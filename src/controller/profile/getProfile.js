import globalFhirValidator from "#root/fhir-validator-loader.js";
import { app } from "#root/app.js";

/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function getProfile(req, res) {
    try {
        let jProfiles = await globalFhirValidator.validator.getStructures();
        let profiles = await jProfiles.toArray();
        res.code(200).send(profiles);
    } catch(e) {
        app.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}


export default getProfile;

