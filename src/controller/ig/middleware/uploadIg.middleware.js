import fs from "fs";
import fsP from "fs/promises";
import * as R from "remeda";
import path from "path";
import { uid } from "uid";

import { getCurrentDirname } from "#root/utils/currentModule.js";
import { fileTypeFromStream } from "file-type";

export default [
    /**
     * Check the uploaded IG file.
     * The MIME Type must be application/gzip.
     * @param {import("fastify").FastifyRequest} req 
     * @param {import("fastify").FastifyReply} res 
     */
    async (req, res) => {
        try {
            let filesMimeTypes = [];
            /** @type { import("formidable").File[] } */
            let files = R.pipe(req.body, R.prop("files"));
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let fileStream = fs.createReadStream(file.filepath);
                let fileType = await fileTypeFromStream(fileStream);
                let mimeType = R.pathOr(fileType, ["mime"], "");
                filesMimeTypes.push(mimeType);
            }

            if (!filesMimeTypes.every(v => v === "application/gzip")) {
                return res.code(400).send({
                    "statusCode": 400,
                    "error": "Bad Request",
                    "message": "Not every Uploaded Files is gzip (.tgz)"
                });
            }

            await moveFilesToIgFolder(req, files);
        } catch (e) {
            console.error(e);
            throw new Error("Server Error Occurred");
        }
    }
];

/**
 * @param {import("fastify").FastifyRequest} req
 * @param {import("formidable").File[]} files 
 */
async function moveFilesToIgFolder (req, files) {

    for (let i = 0 ; i < files.length; i++) {
        let file = files[i];
        let localFilename = path.join(
            getCurrentDirname(import.meta.url), 
            "../../../data/igs",
            `${uid(16)}.tgz`
        );
        await fsP.rename(
            file.filepath,
            localFilename
        );
        req.local.igFilenames.push(localFilename);
    }

}