/* eslint-disable @typescript-eslint/naming-convention */

import { json } from "file-updater";
import type { Config } from "./types";
import { sortObject } from "./util";

interface VscodeFields {
    engines: { vscode: string };
    extensionKind: string[];
    categories: string[];
    keywords: string[];
    activationEvents: string[];
    contributes: Record<string, unknown>;
}

interface PackageJson extends Partial<VscodeFields> {
    name?: string;
    displayName?: string;
    version?: string;
    description?: string;
    author?: string;
    publisher?: string;
    license?: string;
    private?: boolean;
    main?: string;
    types?: string;
    files?: string[];
    homepage?: string;
    funding?: string;
    repository?: {
        type: string;
        url: string;
    };
    bugs?: {
        url: string;
    };
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
}

export const updatePackageJson = (config: Config) => {
    const { projectName, displayName, author, authorRepository, funding, publisher, projectType } =
        config;
    const react = projectType === "reactApp";

    const reactDependencies = {
        "react": "18.2.0",
        "react-dom": "18.2.0",
        "react-router-dom": "6.9.0",
    };

    const reactDevDependencies = {
        "@types/react-dom": "18.0.11",
        "@types/react": "18.0.29",
        "esbuild": "0.17.13",
        "eslint-plugin-react": "7.32.2",
        "html-esbuild-plugin": "0.2.0",
    };

    const defaultDependences = react ? reactDependencies : {};

    const defaultDevDependencies = {
        ...(react ? reactDevDependencies : {}),
        "@types/mocha": "10.0.6",
        "@types/node": "20.14.7",
        "@typescript-eslint/eslint-plugin": "7.13.1",
        "@typescript-eslint/parser": "7.13.1",
        "eslint": "8.57.0",
        "glob": "10.4.2",
        "mocha": "10.4.0",
        "prettier": "3.3.2",
        "tsx": "4.15.7",
        "typescript": "5.4.5",
    };

    const startScript = { start: "tsx src/index.ts" };
    const compileScript = { compile: "tsc -p ." };
    const cleanOutScript = { clean: "rm -rf out" };
    const cleanLibScript = { clean: "rm -rf lib" };

    const testScripts = {
        "fix:meta": "file-updater && prettier --write .",
        "test:meta": "eslint src && file-updater --test && prettier --check .",
        test: "tsx test/runTests.ts",
    };

    const defaultScripts = (() => {
        switch (projectType) {
            case "nodeApp":
                return {
                    ...startScript,
                    ...compileScript,
                    ...cleanOutScript,
                    ...testScripts,
                };
            case "nodeLib":
                return {
                    ...startScript,
                    ...compileScript,
                    ...cleanLibScript,
                    ...testScripts,
                };
            case "vscodeExtension":
                return {
                    "build": "vsce package",
                    "vscode:prepublish": "npm run compile",
                    ...compileScript,
                    ...cleanOutScript,
                    ...testScripts,
                };
            case "reactApp":
                return {
                    build: "tsc -p . && tsx esbuild.ts",
                    watch: "tsx esbuild.ts --watch",
                    ...cleanOutScript,
                    ...testScripts,
                };
        }
    })();

    const defaultVscodeFields: VscodeFields = {
        engines: { vscode: "^1.90.0" },
        extensionKind: [],
        categories: [],
        keywords: [],
        activationEvents: ["onStartupFinished"],
        contributes: {},
    };

    return json((actual: PackageJson | null): PackageJson => {
        const dependencies = sortObject({
            ...defaultDependences,
            ...(actual?.dependencies ?? {}),
        });
        const devDependencies = sortObject({
            ...defaultDevDependencies,
            ...(actual?.devDependencies ?? {}),
        });
        const scripts = {
            ...defaultScripts,
            ...(actual?.scripts ?? {}),
        };

        const repository = `${authorRepository}/${projectName}`;

        let _private, main, types, files;
        let vscodeFields: VscodeFields | undefined = undefined;

        switch (projectType) {
            case "nodeApp":
                _private = true;
                break;
            case "nodeLib":
                main = "lib/index.js";
                types = "lib/types/index.d.ts";
                files = ["lib/*"];
                break;
            case "reactApp":
                _private = true;
                break;
            case "vscodeExtension":
                _private = true;
                main = "out/extension.js";
                vscodeFields = defaultVscodeFields;
                break;
        }

        return {
            name: projectName,
            displayName: displayName,
            version: "0.1.0",
            description: "TODO",
            author,
            publisher,
            license: "MIT",
            private: _private,
            main,
            types,
            files,
            homepage: repository,
            funding,
            repository: {
                type: "git",
                url: `git+${repository}.git`,
            },
            bugs: {
                url: `${repository}/issues`,
            },
            ...(actual ?? {}),
            ...(vscodeFields ?? {}),
            scripts,
            dependencies,
            devDependencies,
        };
    });
};
