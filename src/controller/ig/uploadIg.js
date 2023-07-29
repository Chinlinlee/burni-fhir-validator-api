import fsP from "fs/promises";
import path from "path";
import globalFhirValidator from "#root/fhir-validator-loader.js";
import { getCurrentDirname } from "#root/utils/currentModule.js";
import { NpmPackage } from "node-java-fhir-validator/src/java-wrapper-js/org/hl7/fhir/utilities/npm/NpmPackage.js";
import { JByteArrayInputStream } from "#root/java/java-instance.js";
/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function uploadIg(req, res) {
    try {
        let loadedIgs = [];
        for (let i = 0; i < req.local.igFilenames.length; i++) {
            let filename = req.local.igFilenames[i];
            let jPackageInfo = await NpmPackage.fromPackage(await JByteArrayInputStream.newInstanceAsync(
                await fsP.readFile(filename)
            ));
            let id = await jPackageInfo.id();
            let version = await jPackageInfo.version();

            if (!await isIgExist(id, version)) {
                loadedIgs.push(await loadIg(filename));
            } else {
                req.log.info(`ig: ${id}, version: ${version} already exist, delete temp file`);
                await fsP.unlink(filename);
                loadedIgs.push({
                    id,
                    version
                });
            }
            
        }

        return res.code(200).send(loadedIgs);
    } catch (e) {
        req.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}

async function isIgExist(id, version) {
    let packageFilename = path.join(
        getCurrentDirname(import.meta.url),
        "../../data/igs",
        `${id}-${version}.tgz`
    );

    try {
        await fsP.access(packageFilename, fsP.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}

async function loadIg(file) {
    try {
        let { id, version } = await globalFhirValidator.loadPackage(
            await fsP.readFile(file)
        );

        let packageFilename = path.join(
            getCurrentDirname(import.meta.url),
            "../../data/igs",
            `${id}-${version}.tgz`
        );

        await fsP.rename(file, packageFilename);

        return {
            id,
            version
        };
    } catch (e) {
        throw e;
    }
}


export default uploadIg;

