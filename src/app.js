import dotenv from "dotenv";
import { IncomingForm } from "formidable";
import Fastify from "fastify";
import path from "path";
import cors from "@fastify/cors";
import * as R from "remeda";

import routesInit from "./routes/index.js";
import { getCurrentDirname } from "./utils/currentModule.js";

dotenv.config();

const fastify = Fastify({
    logger: true
});

fastify.addContentTypeParser(["multipart/form-data"], async (req, payload) => {
    let formParser = new IncomingForm({
        uploadDir: path.join(getCurrentDirname(import.meta.url), "./temp-upload"),
        multiples: true,
        maxFileSize: 100 * 1024 * 1024 * 1024
    });
    const [fields, files] = await formParser.parse(payload);
    let body = {};
    body = R.addProp(body, "fields", fields);
    body = R.merge(body, files);
    
    return body;
});

if (process.env.NODE_ENV !== "production") {
    fastify.register(cors, {
        origin: "*"
    });
}

await routesInit();

export {
    fastify as app
};

