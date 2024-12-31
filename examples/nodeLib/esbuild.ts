import esbuild, { Plugin } from "esbuild";

const plugins: Plugin[] = [
    {
        name: "rebuild-notify",
        setup(build) {
            build.onEnd((result) => {
                if (result.errors.length === 0) {
                    console.log("Build successful");
                }
            });
        },
    },
];

const options: esbuild.BuildOptions = {
    entryPoints: ["src/index.ts"],
    outdir: "lib",
    platform: "node",
    packages: "external",
    bundle: true,
    plugins,
};

async function build() {
    await esbuild.build({
        ...options,
        minify: true,
        entryNames: "[name]-[hash]",
        assetNames: "[name]-[hash]",
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
