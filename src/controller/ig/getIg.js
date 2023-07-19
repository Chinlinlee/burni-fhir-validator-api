import globalFhirValidator from "#root/fhir-validator-loader.js";
import * as R from "remeda";
/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function getIg(req, res) {
    try {
        let jKnownIgs = await globalFhirValidator.validator.getKnownIGs();
        let jKnownIgsSet = await jKnownIgs.keySet();
        let jKnownIgsIter = await jKnownIgsSet.iterator();
        let knownIgs = [];
    
        while (await jKnownIgsIter.hasNext()) {
            let packageId = await jKnownIgsIter.next();
            let igUrl = await jKnownIgs.get(packageId);
    
            knownIgs.push({
                id: packageId,
                url: igUrl
            });
        }

        res.code(200).send(knownIgs);
    } catch(e) {
        req.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}


export default getIg;

