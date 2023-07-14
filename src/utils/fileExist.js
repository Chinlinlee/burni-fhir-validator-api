import fs from "fs";
import fsP from "fs/promises";

/**
 * @param {string} path
 */
export default async (path) => {
    try {
        await fsP.access(path);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * 
 * @param {string} path 
 */
export const sync = (path) => {
    try {
        fs.accessSync(path);
        return true;
    } catch (e) {
        return false;
    }
}
