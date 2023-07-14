import path from "path";
import fastifySwagger from "@fastify/swagger";
import fs from "fs";
import { JSONPath } from "jsonpath-plus";
import * as R from "remeda";

import { app } from "#root/app.js";
import routesInit from "#root/routes/index.js";
import { getCurrentDirname } from "#root/utils/currentModule.js";


await app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Title',
            description: 'Description',
            contact: {
                name: 'Chin-Lin, Lee',
                email: 'a5566qq2581@gmail.com'
            },
            license: {
                name: 'MIT'
            },
            version: '0.0.0'
        },
        servers: [
            { url: 'https://example.com', description: 'Production Server' },
            { url: 'https://dev.example.com', description: 'Development Server' }
        ],
        tags: [{ name: 'service', description: 'Service' }]
    }
});

await routesInit();

app.ready(() => {
    let specFile = path.join(
        getCurrentDirname(import.meta.url),
        "./openapi.json"
    );

    let swaggerJson = getSwagger();
    swaggerJson = replaceFormDataUploadFileSchema(swaggerJson);
    let spec = JSON.stringify(swaggerJson);

    fs.writeFileSync(specFile, spec);
    console.log("write openapi.json file successful");
    process.exit(0);
});

function replaceFormDataUploadFileSchema(swaggerJson) {
    console.log(swaggerJson);
    try {
        let formDataUploadSchemaItems = JSONPath({
            json: swaggerJson,
            path: `$.paths..["multipart/form-data"]..files`,
            resultType: "all"
        });
        
        for (let i = 0 ; i < formDataUploadSchemaItems.length; i++) {
            let schemaItem = formDataUploadSchemaItems[i];
            if (schemaItem.value.minItems === 1) {
                let valuePath = JSONPath.toPathArray(schemaItem.path);
                let propertiesPath = valuePath.slice(1, valuePath.lastIndexOf("properties")+1);
                swaggerJson = R.setPath(swaggerJson, propertiesPath, {
                    "files": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "binary"
                        },
                        "minItems": 1
                    }
                });
            }
        }

        return swaggerJson;
    } catch(e) {
        console.log(e);
    }
}


function getSwagger() {
    return app.swagger();
}

//([A-Za-z.].*)-(\d+\.)?(\d+\.)?(\d+)$