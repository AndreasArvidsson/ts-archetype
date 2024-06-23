import path from "node:path";
import type { UpdaterConfig } from "./types";
import { copyFile, fileExists, resourcesDir } from "./util";

export const createTestDir = (config: UpdaterConfig, workspaceDir: string) => {
    const source = path.join(resourcesDir, "test");
    const destination = path.join(workspaceDir, "test");

    if (fileExists(destination)) {
        return;
    }

    copyFile(source, destination);
};
