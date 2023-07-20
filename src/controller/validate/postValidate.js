import globalFhirValidator from "#root/fhir-validator-loader.js";


/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function validateResource(req, res) {
    try {
        let operationOutcomeStr = await globalFhirValidator.validate(JSON.stringify(req.body, null, 2));
        res.code(200).send(JSON.parse(operationOutcomeStr));
    } catch (e) {
        req.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}

export default validateResource;

