import { react } from "./config";
import { generate } from "./generate";

export const generateEsbuild = () => {
    const options = {
        entryPoints: ["src/index.ts"],
        outdir: react ? "out" : "lib",
        platform: react ? "browser" : "node",
        packages: react ? undefined : "external",
        bundle: true,
        minify: true,
        jsx: react ? "automatic" : undefined,
        loader: react
            ? {
                  ".png": "file",
              }
            : undefined,
        plugins: [],
    };

    type Key = keyof typeof options;

    const optionLines = Object.keys(options)
        .filter((key) => options[key as Key] != null)
        .map((key) => {
            const value = options[key as Key];
            return `    ${key}: ${JSON.stringify(value)},`;
        });
    const optionsStr = `{\n${optionLines.join("\n")}\n}`;

    const content = `
import { build } from "esbuild";

(async () => {
    await build(${optionsStr});
})();
`;

    generate("esbuild.ts", content.trimStart());
};
