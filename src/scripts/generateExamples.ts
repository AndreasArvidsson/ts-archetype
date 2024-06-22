import { updaterWithOptions } from "file-updater";
import * as fs from "node:fs";
import * as path from "node:path";
import { createSrcDir } from "../createSrcDir";
import { createTestDir } from "../createTestDir";
import { type Config } from "../types";
import { updateEsbuild } from "../updateEsbuild";
import { updateEslintrc } from "../updateEslintrc";
import { updateGitignore } from "../updateGitignore";
import { updateLicense } from "../updateLicense";
import { updatePackageJson } from "../updatePackageJson";
import { updatePrettierignore } from "../updatePrettierignore";
import { updatePrettierrc } from "../updatePrettierrc";
import { updateReadme } from "../updateReadme";
import { updateTsconfig } from "../updateTsconfig";
import { updateVscodeSettings } from "../updateVscode";

const defaultConfig: Config = {
    author: "Andreas Arvidsson",
    authorRepository: "https://github.com/AndreasArvidsson",
    projectName: "example-project",
    displayName: "Example project",
};

const examplesDir = path.join(__dirname, "../../examples");

async function generateExample(isReact: boolean) {
    const name = isReact ? "react" : "lib";
    const workspaceDir = path.join(examplesDir, name);
    const config = { ...defaultConfig, react: isReact };

    console.log(`Generating ${name} example...`);

    await updaterWithOptions(
        {
            [".eslintrc.json"]: updateEslintrc(config),
            [".gitignore"]: updateGitignore(config),
            [".prettierignore"]: updatePrettierignore(config),
            [".prettierrc.json"]: updatePrettierrc(config),
            [".vscode/settings.json"]: updateVscodeSettings(config),
            ["LICENSE"]: updateLicense(config),
            ["package.json"]: updatePackageJson(config),
            ["README.md"]: updateReadme(config),
            ["tsconfig.json"]: updateTsconfig(config),
            ...(isReact ? { ["esbuild.ts"]: updateEsbuild(config) } : {}),
        },
        { workspaceDir }
    );

    createSrcDir(config, workspaceDir);
    createTestDir(config, workspaceDir);
}

void (async () => {
    fs.rmSync(examplesDir, { recursive: true, force: true });

    await generateExample(false);
    await generateExample(true);
})();
