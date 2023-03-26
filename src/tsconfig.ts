import { react } from "./config";
import { generate } from "./generate";

export const generateTsconfig = () => {
    const target = react ? "ES6" : "ESNext";

    const content = {
        compilerOptions: {
            module: "ESNext",
            target: target,
            lib: ["ESNext", ...(react ? ["DOM"] : [])],
            moduleResolution: "nodenext",
            rootDir: "src",
            declarationDir: react ? undefined : "lib/types",
            esModuleInterop: true,
            emitDeclarationOnly: react ? undefined : true,
            declaration: react ? undefined : true,
            noEmit: react ? true : undefined,
            noEmitOnError: react ? undefined : true,
            strict: true,
            forceConsistentCasingInFileNames: true,
            jsx: react ? "react-jsx" : undefined,
        },
        include: ["src"],
    };

    generate("tsconfig.json", content);
};
