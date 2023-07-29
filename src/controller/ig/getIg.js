import globalFhirValidator from "#root/fhir-validator-loader.js";
import * as R from "remeda";
/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function getIg(req, res) {
    try {
        let knownIgs = await globalFhirValidator.getKnownIgs();

        res.code(200).send(knownIgs);
    } catch(e) {
        req.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}


export default getIg;

