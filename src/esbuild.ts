import { Config } from "./config";
import { writeFile } from "./util";

const libContent = `
import esbuild from "esbuild";

const options: esbuild.BuildOptions = {
    entryPoints: ["src/index.ts"],
    outdir: "lib",
    platform: "node",
    packages: "external",
    bundle: true,
};

export const build = async () => {
    await esbuild.build({
        ...options,
        minify: true,
        entryNames: "[name]-[hash]",
        assetNames: "[name]-[hash]",
    });
};

export const watch = async () => {
    const ctx = await esbuild.context(options);
    return ctx.watch();
};
`;

const reactContent = `
import esbuild from "esbuild";
import htmlPlugin from "html-esbuild-plugin";

const options: esbuild.BuildOptions = {
    entryPoints: ["src/index.ts"],
    outdir: "out",
    platform: "browser",
    jsx: "automatic",
    bundle: true,
    loader: {
        ".png": "file",
        ".jpg": "file",
        ".svg": "file",
        ".gif": "file",
        ".ico": "file",
    },
    plugins: [
        htmlPlugin({
            template: "./src/index.html",
            title: "My title",
        }),
    ],
};

export const build = async () => {
    await esbuild.build({
        ...options,
        minify: true,
    });
};

export const watch = async () => {
    const ctx = await esbuild.context(options);
    return ctx.watch();
};
`;

export const generateEsbuild = (config: Config) => {
    const content = config.react ? reactContent : libContent;

    const buildContent = `
import { build } from "./esbuild";

(async () => {
    await build();
})();
`;

    const watchContent = `
import { watch } from "./esbuild";

(async () => {
    await watch();
})();
`;

    writeFile(config, "esbuild.ts", content.trimStart());
    writeFile(config, "esbuild-build.ts", buildContent.trimStart());
    writeFile(config, "esbuild-watch.ts", watchContent.trimStart());
};
