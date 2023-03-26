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
