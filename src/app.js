
import Fastify from "fastify";
import { IncomingForm } from "formidable";
import dotenv from "dotenv";
import routesInit from "./routes/index.js";
import * as R from "remeda";
import path from "path";
import { getCurrentDirname } from "./utils/currentModule.js";
import cors from "@fastify/cors";

dotenv.config();

const envLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
                colorize: true
            },
        },
    },
    production: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
            }
        },
    },
    test: false
};

const fastify = Fastify({
    logger: envLogger[process.env.NODE_ENV] ?? true,
});

if (process.env.NODE_ENV !== "production") {
    fastify.register(cors, {
        origin: "*"
    });
}

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

await routesInit();

export {
    fastify as app
};

