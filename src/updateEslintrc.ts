/* eslint-disable @typescript-eslint/naming-convention */

import { json } from "file-updater";
import type { UpdaterConfig } from "./types";

type Rules = Record<string, string | (object | string)[]>;

interface Override {
    files: string[];
    rules: Rules;
}

interface Eslintrc {
    extends: string[];
    root: boolean;
    parser: string;
    plugins: string[];
    ignorePatterns: string[];
    parserOptions: {
        project: string;
        sourceType: string;
        ecmaVersion: number;
        ecmaFeatures?: {
            jsx: boolean;
        };
    };
    settings?: {
        react: {
            version: string;
        };
    };
    rules: Rules;
    overrides?: Override[];
}

export const updateEslintrc = (config: UpdaterConfig) => {
    const react = config.projectType === "reactApp";
    const ecmaFeatures = react ? { jsx: true } : undefined;
    const settings = react ? { react: { version: "detect" } } : undefined;

    const defaultRules: Rules = {
        // Enforce naming conventions for everything across a codebase.
        "@typescript-eslint/naming-convention": "error",
        // Disallow the any type.
        "@typescript-eslint/no-explicit-any": "off",
        // Require or disallow semicolons instead of ASI.
        "@typescript-eslint/semi": "warn",
        // Enforce consistent brace style for all control statements
        "curly": "error",
        // Disallow throwing literals as exceptions
        "no-throw-literal": "error",
        // Disallow specified warning terms in comments
        "no-warning-comments": "warn",
        // Require the use of === and !==
        "eqeqeq": ["error", "always", { "null": "never" }],
        // Disallow unused variables.
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    };

    const tsxOverrides: Override[] = [
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

    return json((actual: Eslintrc | null): Eslintrc => {
        const _extends = [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
        ];

        if (react) {
            _extends.splice(1, 0, "plugin:react/recommended", "plugin:react/jsx-runtime");
        }

        const expected: Eslintrc = {
            extends: _extends,
            root: true,
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
            ignorePatterns: ["/*", "!src"],
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module",
                ecmaVersion: 2022,
                ecmaFeatures,
            },
            settings,
            rules: {},
            overrides: undefined,
            ...(actual ?? {}),
        };

        expected.rules = {
            ...defaultRules,
            ...(actual?.rules ?? {}),
        };

        if (react) {
            expected.overrides = [...(actual?.overrides ?? []), ...tsxOverrides];
        }

        return expected;
    });
};
