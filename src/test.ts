import fs from "node:fs";
import path from "node:path";
import { generateDir, resourcesDir } from "./generate";

export const generateTest = () => {
    const source = path.join(resourcesDir, "test");
    const destination = path.join(generateDir, "test");
    fs.cpSync(source, destination, {
        recursive: true,
    });
};
