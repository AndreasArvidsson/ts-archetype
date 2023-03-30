import fs from "node:fs";
import path from "node:path";
import { Config } from "./config";
import { generateDir, resourcesDir } from "./util";

export const generateSrc = (config: Config) => {
    fs.mkdirSync(path.join(generateDir(config), "src"));

    if (config.react) {
        fs.cpSync(path.join(resourcesDir, "react"), path.join(generateDir(config), "src"), {
            recursive: true
        });
    } else {
        fs.cpSync(
            path.join(resourcesDir, "index.ts"),
            path.join(generateDir(config), "src/index.ts")
        );
    }
};
