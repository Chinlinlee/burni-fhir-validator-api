import { app } from "#root/app.js";
import { packageClient } from "#root/fhir-package-client.js";

/**
 * 
 * @param {import("fastify").FastifyRequest} req 
 * @param {import("fastify").FastifyReply} res 
 */
async function getIgFromRegistry(req, res) {
    try {
        let jPackageList = await packageClient.listFromRegistry(null, null, null);
        let jPackageListIter = await jPackageList.iterator();

        let packageInfos = [];
        while(await jPackageListIter.hasNext()) {
            let jPackage = await jPackageListIter.next();
            let packageInfo = {
                id: await jPackage.getId(),
                version: await jPackage.getVersion(),
                fhirVersion: await jPackage.getFhirVersion(),
                url: await jPackage.getUrl()
            }
            packageInfos.push(packageInfo);
        }

        res.code(200).send(packageInfos);
    } catch (e) {
        app.log.error(e);
        throw new Error("500 Internal Server Error");
    }
}


export default getIgFromRegistry;

