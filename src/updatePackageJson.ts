/* eslint-disable @typescript-eslint/naming-convention */

import { json } from "file-updater";
import type { Config } from "./types";
import { sortObject } from "./util";

interface PackageJson {
    name?: string;
    displayName?: string;
    version?: string;
    description?: string;
    author?: string;
    license?: string;
    private?: boolean;
    main?: string;
    types?: string;
    files?: string[];
    homepage?: string;
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
    const { projectName, displayName, author, authorRepository, react } = config;

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

    const defaultScripts = {
        start: "tsx src/index.ts",
        ...(react
            ? { build: "tsc -p . && tsx esbuild.ts", watch: "tsx esbuild.ts --watch" }
            : { compile: "tsc -p ." }),
        "fix:meta": "prettier --write .",
        "test:meta": "eslint src && prettier --check .",
        test: "tsx test/runTests.ts",
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

        return {
            name: projectName,
            displayName: displayName,
            version: "0.1.0",
            description: react ? undefined : "TODO",
            author: author,
            license: "MIT",
            private: react ? true : undefined,
            main: react ? undefined : "lib/index.js",
            types: react ? undefined : "lib/types/index.d.ts",
            files: react ? undefined : ["lib/*"],
            homepage: repository,
            repository: {
                type: "git",
                url: `git+${repository}.git`,
            },
            bugs: {
                url: `${repository}/issues`,
            },
            ...actual,
            scripts,
            dependencies,
            devDependencies,
        };
    });
};
