import * as R from "remeda";
import fsP from "fs/promises";
import path from "path";

import globalFhirValidator from "#root/fhir-validator-loader.js";
import { app } from "#root/app.js";
import { getCurrentDirname } from "#root/utils/currentModule.js";
import fileExist from "#root/utils/fileExist.js";

/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function validateResource(req, res) {
    try {
        let operationOutcomeStr = await globalFhirValidator.validate(JSON.stringify(req.body));
        res.code(200).send(JSON.parse(operationOutcomeStr));
    } catch (e) {
        app.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}

export default validateResource;

