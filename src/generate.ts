import fs from "node:fs";
import path from "node:path";

export const generateDir = path.join(__dirname, "../generated");
export const resourcesDir = path.join(__dirname, "../resources");

export const makeGenerateDir = () => {
    fs.rmSync(generateDir, { recursive: true, force: true });
    fs.mkdirSync(generateDir, { recursive: true });
};

export const generate = (filename: string, content: string | object) => {
    content =
        typeof content === "string"
            ? content
            : JSON.stringify(content, null, 4);

    const fullPath = path.join(generateDir, filename);

    fs.writeFileSync(fullPath, content);
};
