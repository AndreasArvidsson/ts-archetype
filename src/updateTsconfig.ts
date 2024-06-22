import { json } from "file-updater";
import type { Config } from "./types";

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

export const updateTsconfig = (config: Config) => {
    const { react } = config;
    const target = react ? "ES6" : "ESNext";

    return json((actual: Tsconfig | null): Tsconfig => {
        const include = actual?.include ?? ["src"];
        return {
            ...actual,
            compilerOptions: {
                module: "NodeNext",
                target: target,
                lib: ["ESNext", ...(react ? ["DOM"] : [])],
                moduleResolution: "NodeNext",
                rootDir: "src",
                outDir: react ? undefined : "lib",
                declarationDir: react ? undefined : "lib/types",
                esModuleInterop: true,
                declaration: react ? undefined : true,
                sourceMap: react ? undefined : true,
                noEmit: react ? true : undefined,
                noEmitOnError: react ? undefined : true,
                strict: true,
                forceConsistentCasingInFileNames: true,
                noImplicitReturns: true,
                jsx: react ? "react-jsx" : undefined,
                ...actual?.compilerOptions
            },
            include
        };
    });
};
