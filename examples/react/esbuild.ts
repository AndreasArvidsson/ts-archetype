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
