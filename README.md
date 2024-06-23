# TS archetype

Archetype for creating and maintaining typescript repositories

## Usage

Uses [file-updater](https://www.npmjs.com/package/file-updater) to maintain project files.

Run `npm run file-updater`

File: `package.json`

```json
"scripts": {
    "file-updater": "file-updater"
}
```

File: `.file-updater.mjs`

```ts
import { updater } from "file-updater";
import {
    updateEslintrc,
    updateGitignore,
    updatePrettierignore,
    updatePrettierrc,
    updateVscodeSettings,
    updateEsbuild,
    updateLicense,
    updatePackageJson,
    updateReadme,
    updateTsconfig,
    createSrcDir,
    createTestDir,
} from "ts-archetype";

const config = {
    author: "Andreas Arvidsson",
    authorRepository: "https://github.com/AndreasArvidsson",
    funding: "https://github.com/sponsors/AndreasArvidsson",
    projectName: "example-project",
    displayName: "Example project",
    projectType: "vscodeExtension",
};

export default async (workspaceDir) => {
    await updater({
        ".eslintrc.json": updateEslintrc(config),
        ".gitignore": updateGitignore(config),
        ".prettierignore": updatePrettierignore(config),
        ".prettierrc.json": updatePrettierrc(config),
        ".vscode/settings.json": updateVscodeSettings(config),
        "esbuild.ts": updateEsbuild(config),
        "LICENSE": updateLicense(config),
        "package.json": updatePackageJson(config),
        "README.md": updateReadme(config),
        "tsconfig.json": updateTsconfig(config),
    });

    createSrcDir(config, workspaceDir);
    createTestDir(config, workspaceDir);
};
```
