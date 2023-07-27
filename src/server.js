import { IncomingForm } from "formidable";
import dotenv from "dotenv";
import { app } from "./app.js";
import routesInit from "./routes/index.js";
import * as R from "remeda";
import path from "path";
import { getCurrentDirname } from "./utils/currentModule.js";
import cors from "@fastify/cors";

dotenv.config();

app.listen({
    port: process.env.PORT,
    host: process.env.HOST
}, function(err, address) {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
