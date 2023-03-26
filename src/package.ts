/* eslint-disable @typescript-eslint/naming-convention */

import { Config } from "./config";
import { sortObject, writeFile } from "./util";

export const generatePackage = (config: Config) => {
    const { projectName, displayName, author, repository, react } = config;

    const reactDependencies = {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.9.0",
    };

    const reactDevDependencies = {
        "@types/react": "^18.0.29",
        "@types/react-dom": "^18.0.11",
        "html-esbuild-plugin": "^0.2.0",
        "eslint-plugin-react": "^7.32.2",
    };

    const dependencies = react ? reactDependencies : {};

    const devDependencies = {
        ...(react ? reactDevDependencies : {}),
        "@types/glob": "^8.1.0",
        "@types/mocha": "^10.0.1",
        "@types/node": "^18.15.9",
        "@typescript-eslint/eslint-plugin": "^5.56.0",
        "@typescript-eslint/parser": "^5.56.0",
        "esbuild": "^0.17.13",
        "eslint-config-prettier": "^8.8.0",
        "eslint-plugin-prettier": "^4.2.1",
        "eslint": "^8.36.0",
        "glob": "^9.3.2",
        "mocha": "^10.2.0",
        "prettier": "^2.8.7",
        "tsx": "^3.12.6",
        "typescript": "^5.0.2",
    };

    const content = {
        name: projectName,
        displayName: displayName,
        version: "0.0.1",
        description: "TODO",
        author: author,
        license: "MIT",
        main: "lib/index.js",
        types: "lib/types/index.d.ts",
        files: ["lib/*"],
        homepage: `${repository}/${projectName}`,
        repository: {
            type: "git",
            url: `${repository}/${projectName}`,
        },
        bugs: {
            url: `${repository}/${projectName}/issues`,
        },
        scripts: {
            start: "tsx src/index.ts",
            test: "tsx test/runTests.ts",
            build: "tsc -p . && tsx esbuild.ts",
            watch: "tsx esbuild.ts --watch",
            lint: "eslint .",
        },
        dependencies: {},
        devDependencies: {},
    };

    content.dependencies = sortObject(dependencies);
    content.devDependencies = sortObject(devDependencies);

    writeFile(config, "package.json", content);
};
