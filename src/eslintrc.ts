/* eslint-disable @typescript-eslint/naming-convention */

import { Config } from "./config";
import { writeFile } from "./util";

export const generateEslintrc = (config: Config) => {
    const { react } = config;
    const ecmaFeatures = react ? { jsx: true } : undefined;
    const settings = react ? { react: { version: "detect" } } : undefined;

    const tsxOverrides = [
        {
            files: ["**/*.tsx"],
            rules: {
                "@typescript-eslint/naming-convention": [
                    "error",
                    {
                        selector: "default",
                        format: ["camelCase"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "variable",
                        format: ["camelCase", "UPPER_CASE"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "typeLike",
                        format: ["PascalCase"],
                    },
                    {
                        selector: "function",
                        format: ["camelCase", "PascalCase"],
                    },
                ],
            },
        },
    ];

    const content = {
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "plugin:prettier/recommended",
        ],
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint"],
        root: true,
        ignorePatterns: ["/*", "!src"],
        parserOptions: {
            project: true,
            sourceType: "module",
            ecmaVersion: 2022,
            ecmaFeatures,
        },
        settings,
        rules: {
            "@typescript-eslint/naming-convention": "error",
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
        overrides: react ? tsxOverrides : undefined,
    };

    if (react) {
        content.extends.splice(
            1,
            0,
            "plugin:react/recommended",
            "plugin:react/jsx-runtime"
        );
    }

    writeFile(config, ".eslintrc.json", content);
};
