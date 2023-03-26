import fs from "node:fs";
import path from "node:path";
import { Config } from "./config";

export const resourcesDir = path.join(__dirname, "../resources");

export const generateDir = (config: Config): string => {
    if (!config.outDir) {
        console.log(__dirname, config.outDir);
    }
    return path.join(__dirname, "..", config.outDir);
};

export const makeGenerateDir = (config: Config) => {
    fs.rmSync(generateDir(config), { recursive: true, force: true });
    fs.mkdirSync(generateDir(config), { recursive: true });
};

export const writeFile = (
    config: Config,
    filename: string,
    content: string | object
) => {
    content =
        typeof content === "string"
            ? content
            : JSON.stringify(content, null, 4);

    const fullPath = path.join(generateDir(config), filename);

    fs.writeFileSync(fullPath, content);
};
