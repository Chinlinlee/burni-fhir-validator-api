import { packageClient } from "#root/fhir-package-client.js";

/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function getIgVersion(req, res) {
    try {
        let { igName } = req.params;
        let packageInfoArray = [];
        let jPackageVersionList = await packageClient.getVersions(igName);
        let jPackageVersionIter = await jPackageVersionList.iterator();

        while(await jPackageVersionIter.hasNext()) {
            let jPackageVersion = await jPackageVersionIter.next();
            packageInfoArray.push({
                id: await jPackageVersion.getId(),
                version: await jPackageVersion.getVersion(),
                fhirVersion: await jPackageVersion.getFhirVersion(),
                url: await jPackageVersion.getUrl()
            });
        }

        res.code(200).send(packageInfoArray);
    } catch (e) {
        req.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}


export default getIgVersion;

