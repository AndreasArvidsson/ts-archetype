import fs from "node:fs";
import path from "node:path";
import { Config } from "./config";
import { generateDir, resourcesDir } from "./util";

export const generateTest = (config: Config) => {
    const source = path.join(resourcesDir, "test");
    const destination = path.join(generateDir(config), "test");
    fs.cpSync(source, destination, {
        recursive: true
    });
};
