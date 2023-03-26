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
        entryNames: react ? "[name]-[hash]" : undefined,
        assetNames: react ? "[name]-[hash]" : undefined,
        jsx: react ? "automatic" : undefined,
        loader: react
            ? {
                  ".png": "file",
                  ".jpg": "file",
                  ".svg": "file",
                  ".gif": "file",
                  ".ico": "file",
              }
            : undefined,
    };

    type Key = keyof typeof options;

    const optionLines = Object.keys(options)
        .filter((key) => options[key as Key] != null)
        .map((key) => {
            const value = options[key as Key];
            return `        ${key}: ${JSON.stringify(value)},`;
        });

    if (react) {
        optionLines.push(`        plugins: [
            htmlPlugin({
                template: "./src/index.html",
                title: "My title",
            }),
        ]`);
    }

    const content = `
import { build } from "esbuild";
${react ? 'import htmlPlugin from "html-esbuild-plugin";' : ""}

(async () => {
    await build({
${optionLines.join("\n")}
    });
})();
`;

    generate("esbuild.ts", content.trimStart());
};
