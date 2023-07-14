import { PackageClient } from "node-java-fhir-validator/src/java-wrapper-js/org/hl7/fhir/utilities/npm/PackageClient.js";
import { PackageServer } from "node-java-fhir-validator/src/java-wrapper-js/org/hl7/fhir/utilities/npm/PackageServer.js";

const PACKAGE_CLIENT_ADDRESS = "https://packages.fhir.org";

export const packageClient = await (async () => {
    return await PackageClient.newInstanceAsync(
        await PackageServer.newInstanceAsync(PACKAGE_CLIENT_ADDRESS)
    );
})();