// from: https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * 
 * @param {string} metaUrl 
 * @example
 * const __filename = getFilename(import.meta.url);
 */
export const getCurrentFilename = (metaUrl) => {
    return fileURLToPath(metaUrl);
};

/**
 * @param {string} metaUrl
 * @example
 * const __dirname = getDirname(import.meta.url);
 */
export const getCurrentDirname = (metaUrl) => {
    return dirname(getCurrentFilename(metaUrl));
};