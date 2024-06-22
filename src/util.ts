import * as path from "node:path";
import * as fs from "node:fs";

export const resourcesDir = path.join(__dirname, "../resources");

export const sortObject = (obj: { [key: string]: string }) => {
    const res: { [key: string]: string } = {};
    const entries = Object.entries(obj);
    entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    for (const [key, val] of entries) {
        res[key] = val;
    }
    return res;
};

export function uniqueValues(arr: string[]) {
    return arr.filter((value, index, arr) => arr.indexOf(value) === index);
}

export function makeDirs(dirPath: string) {
    fs.mkdirSync(dirPath, { recursive: true });
}

export function copyFile(source: string, destination: string) {
    fs.cpSync(source, destination, { recursive: true });
}

export function fileExists(filePath: string) {
    return fs.existsSync(filePath);
}
