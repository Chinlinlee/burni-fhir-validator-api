import globalFhirValidator from "#root/fhir-validator-loader.js";

/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function getProfile(req, res) {
    try {
        let profiles = await globalFhirValidator.getStructures();
        res.code(200).send(profiles);
    } catch(e) {
        req.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}


export default getProfile;

