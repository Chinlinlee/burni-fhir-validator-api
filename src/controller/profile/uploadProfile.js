import * as R from "remeda";
import fsP from "fs/promises";
import path from "path";

import globalFhirValidator from "#root/fhir-validator-loader.js";
import { getCurrentDirname } from "#root/utils/currentModule.js";
import fileExist from "#root/utils/fileExist.js";

/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function uploadProfile(req, res) {
    try {
        await storeProfile(req.body);

        await globalFhirValidator.validator.loadProfile(
            Buffer.from(JSON.stringify(req.body), "utf8")
        );
        res.code(200).send();
    } catch (e) {
        req.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}

async function storeProfile(profileJson) {
    let id = R.pathOr(profileJson, ["id"], "");
    let version = R.pathOr(profileJson, ["version"], "0.0.0");
    let profileFilename = `${id}-${version}-SD.json`;
    let storeDest = path.join(
        getCurrentDirname(import.meta.url),
        "../../data/profiles",
        profileFilename
    );

    if (await fileExist(storeDest)) {
        req.log.info(`profile ${storeDest} already exists`);
        return;
    }

    try {
        await fsP.writeFile(storeDest, JSON.stringify(profileJson));
    } catch (e) {
        throw new Error(e);
    }
}


export default uploadProfile;

