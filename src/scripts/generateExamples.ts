import { updaterWithOptions } from "file-updater";
import * as fs from "node:fs";
import * as path from "node:path";
import { createSrcDir } from "../createSrcDir";
import { createTestDir } from "../createTestDir";
import { projectTypes, type UpdaterConfig, type ProjectType } from "../types";
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

const defaultConfig = {
    author: "Andreas Arvidsson",
    publisher: "AndreasArvidsson",
    authorRepository: "https://github.com/AndreasArvidsson",
    funding: "https://github.com/sponsors/AndreasArvidsson",
    projectName: "example-project",
    displayName: "Example project",
};

const examplesDir = path.join(__dirname, "../../examples");

async function generateExample(projectType: ProjectType) {
    const workspaceDir = path.join(examplesDir, projectType);
    const config: UpdaterConfig = { ...defaultConfig, projectType };

    console.log(`Generating ${projectType} example...`);

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
            ...(projectType === "reactApp" ? { ["esbuild.ts"]: updateEsbuild(config) } : {}),
        },
        { workspaceDir, quiet: true }
    );

    createSrcDir(config, workspaceDir);
    createTestDir(config, workspaceDir);
}

void (async () => {
    fs.rmSync(examplesDir, { recursive: true, force: true });

    for (const projectType of projectTypes) {
        await generateExample(projectType);
    }
})();
