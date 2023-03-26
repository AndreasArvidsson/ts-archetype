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
