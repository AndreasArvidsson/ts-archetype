import { json } from "file-updater";
import type { UpdaterConfig } from "./types";

interface Tsconfig {
    compilerOptions: {
        module: string;
        target: string;
        lib: string[];
        moduleResolution: string;
        rootDir: string;
        outDir?: string;
        declarationDir?: string;
        esModuleInterop?: boolean;
        emitDeclarationOnly?: boolean;
        declaration?: boolean;
        noEmit?: boolean;
        noEmitOnError?: boolean;
        strict?: boolean;
        sourceMap?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        noImplicitReturns?: boolean;
        jsx?: "react-jsx";
    };
    include: string[];
}

interface Parameters {
    outDir: string;
    declarationDir?: string;
    declaration?: boolean;
    sourceMap?: boolean;
    noEmit?: boolean;
    jsx?: "react-jsx";
    extraLibs?: string[];
}

export const updateTsconfig = (config: UpdaterConfig) => {
    const react = config.projectType === "reactApp";
    const target = react ? "ES6" : "ESNext";

    const { outDir, declaration, declarationDir, extraLibs, noEmit, sourceMap, jsx }: Parameters =
        (() => {
            switch (config.projectType) {
                case "nodeApp":
                    return { outDir: "out" };
                case "nodeLib":
                    return {
                        outDir: "lib",
                        declaration: true,
                        declarationDir: "lib/types",
                        sourceMap: true,
                    };
                case "vscodeExtension":
                    return { outDir: "out", sourceMap: true };
                case "reactApp":
                    return { outDir: "out", extraLibs: ["DOM"], jsx: "react-jsx", noEmit: true };
            }
        })();

    return json((actual: Tsconfig | null): Tsconfig => {
        const include = actual?.include ?? ["src"];
        return {
            ...actual,
            compilerOptions: {
                module: "NodeNext",
                target: target,
                lib: ["ESNext", ...(extraLibs ?? [])],
                moduleResolution: "NodeNext",
                rootDir: "src",
                outDir,
                declarationDir,
                esModuleInterop: true,
                declaration,
                sourceMap,
                noEmit,
                noEmitOnError: noEmit ? undefined : true,
                strict: true,
                forceConsistentCasingInFileNames: true,
                noImplicitReturns: true,
                jsx,
                ...actual?.compilerOptions,
            },
            include,
        };
    });
};
