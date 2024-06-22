import path from "node:path";
import type { Config } from "./types";
import { copyFile, fileExists, resourcesDir } from "./util";

export const createTestDir = (config: Config, workspaceDir: string) => {
    const source = path.join(resourcesDir, "test");
    const destination = path.join(workspaceDir, "test");

    if (fileExists(destination)) {
        return;
    }

    copyFile(source, destination);
};
