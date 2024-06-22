import path from "node:path";
import type { Config } from "./types";
import { copyFile, fileExists, makeDirs, resourcesDir } from "./util";

export const createSrcDir = (config: Config, workspaceDir: string) => {
    const srcDir = path.join(workspaceDir, "src");

    if (fileExists(srcDir)) {
        return;
    }

    makeDirs(srcDir);

    if (config.react) {
        copyFile(path.join(resourcesDir, "react"), srcDir);
    } else {
        copyFile(path.join(resourcesDir, "index.ts"), path.join(srcDir, "index.ts"));
    }
};
