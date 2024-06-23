import path from "node:path";
import type { Config } from "./types";
import { copyFile, fileExists, makeDirs, resourcesDir } from "./util";

export const createSrcDir = (config: Config, workspaceDir: string) => {
    const srcDir = path.join(workspaceDir, "src");

    if (fileExists(srcDir)) {
        return;
    }

    makeDirs(srcDir);

    if (config.projectType === "reactApp") {
        copyFile(path.join(resourcesDir, "react"), srcDir);
    } else if (config.projectType === "vscodeExtension") {
        copyFile(path.join(resourcesDir, "extension.ts"), path.join(srcDir, "extension.ts"));
    } else {
        copyFile(path.join(resourcesDir, "index.ts"), path.join(srcDir, "index.ts"));
    }
};
