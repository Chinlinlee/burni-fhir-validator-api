import path from "path";
import { globSync } from "glob";

import { app } from "#root/app.js";
import { getCurrentDirname } from "#root/utils/currentModule.js";


export default async () => {
    const routeFiles = globSync("**/*.route.js", {
        cwd: getCurrentDirname(import.meta.url)
    });

    for (let i = 0; i < routeFiles.length; i++) {
        let routeFile = routeFiles[i];
        let route = (await import(
            `./${routeFile}`
        )).default;
        app.register(route);
    }
}