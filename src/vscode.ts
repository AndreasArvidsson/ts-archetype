import fs from "node:fs";
import path from "node:path";
import { Config } from "./config";
import { generateDir, writeFile } from "./util";

export const generateVscode = (config: Config) => {
    const content = {
        ["editor.defaultFormatter"]: "esbenp.prettier-vscode",
    };

    fs.mkdirSync(path.join(generateDir(config), ".vscode"));

    writeFile(config, ".vscode/settings.json", content);
};
