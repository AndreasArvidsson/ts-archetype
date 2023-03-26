/* eslint-disable @typescript-eslint/naming-convention */

import { Config } from "./config";
import { writeFile } from "./util";

export const generateEslintrc = (config: Config) => {
    const { react } = config;
    const ecmaFeatures = react ? { jsx: true } : undefined;
    const settings = react ? { react: { version: "detect" } } : undefined;

    const content = {
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
        ],
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint"],
        root: true,
        parserOptions: {
            project: true,
            sourceType: "module",
            ecmaVersion: 2022,
            ecmaFeatures,
        },
        settings,
        rules: {
            "@typescript-eslint/naming-convention": "warn",
            "@typescript-eslint/semi": "warn",
            "@typescript-eslint/no-non-null-assertion": "off",
            "curly": "error",
            "no-throw-literal": "error",
            "no-warning-comments": [
                "warn",
                {
                    terms: ["TODO"],
                },
            ],
            eqeqeq: [
                "error",
                "always",
                {
                    null: "never",
                },
            ],
        },
    };

    if (react) {
        content.extends.splice(1, 0, "plugin:react/recommended");
    }

    writeFile(config, ".eslintrc.json", content);
};
