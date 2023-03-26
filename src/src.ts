import fs from "node:fs";
import path from "node:path";
import { react } from "./config";
import { generateDir, resourcesDir } from "./generate";

export const generateSrc = () => {
    fs.mkdirSync(path.join(generateDir, "src"));

    if (react) {
        fs.cpSync(
            path.join(resourcesDir, "react"),
            path.join(generateDir, "src"),
            { recursive: true }
        );
    } else {
        fs.cpSync(
            path.join(resourcesDir, "index.ts"),
            path.join(generateDir, "src/index.ts")
        );
    }
};
