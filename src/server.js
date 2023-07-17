import { IncomingForm } from "formidable";
import dotenv from "dotenv";
import { app } from "./app.js";
import routesInit from "./routes/index.js";
import * as R from "remeda";
import path from "path";
import { getCurrentDirname } from "./utils/currentModule.js";
import cors from "@fastify/cors";

dotenv.config();

if (process.env.NODE_ENV !== "production") {
    app.register(cors, {
        origin: "*"
    });
}

app.addContentTypeParser(["multipart/form-data"], async (req, payload) => {
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

app.listen({
    port: process.env.PORT,
    host: process.env.HOST
}, function(err, address) {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
