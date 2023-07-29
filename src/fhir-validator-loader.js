import { getCurrentDirname } from "#root/utils/currentModule.js";
import path from "path";
import { FhirValidator } from "node-java-fhir-validator";
import { globSync } from "glob";
import fsP from "fs/promises";

/** @type {FhirValidator} */
let globalFhirValidator;

export default await (async () => {
    try {
        globalFhirValidator = new FhirValidator({
            igDir: path.join(getCurrentDirname(import.meta.url), "./data/igs")
        });

        if (process.env.NODE_ENV !== "docs") {
            await loadProfiles();
        }

        console.log("FhirValidator Initialized");
        
        return globalFhirValidator;
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
})();

async function loadProfiles() {
    let profiles = globSync("data/profiles/**/*.json", {
        cwd: getCurrentDirname(import.meta.url),
        absolute: true
    });

    try {
        for (let i = 0 ; i < profiles.length; i++) {
            let profile = profiles[i];
            await globalFhirValidator.loadProfile(
                await fsP.readFile(profile)
            );
        }
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
    
}