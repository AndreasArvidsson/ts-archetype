import type { UpdaterConfig } from "./types";

const libContent = `
import esbuild from "esbuild";

const options: esbuild.BuildOptions = {
    entryPoints: ["src/index.ts"],
    outdir: "lib",
    platform: "node",
    packages: "external",
    bundle: true,
};

async function build() {
    await esbuild.build({
        ...options,
        minify: true,
        entryNames: "[name]-[hash]",
        assetNames: "[name]-[hash]",
    });
}
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

async function build() {
    await esbuild.build({
        ...options,
        minify: true,
    });
}
`;

export const updateEsbuild = (config: UpdaterConfig) => {
    const trailingContent = `
async function watch() {
    const ctx = await esbuild.context(options);
    await ctx.watch();
}

(async () => {
    if (process.argv.includes("--watch")) {
        await watch();
    } else {
        await build();
    }
})();
`;

    const content = (() => {
        switch (config.projectType) {
            case "reactApp":
                return reactContent;
            case "nodeLib":
                return libContent;
            default:
                return undefined;
        }
    })();

    const expected = content != null ? `${content}${trailingContent}`.trimStart() : null;

    return (actual: string | null) => actual || expected;
};
