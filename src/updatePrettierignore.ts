import type { Config } from "./types";

export const updatePrettierignore = (config: Config) => {
    const lines = ["node_modules", ...(config.react ? [] : ["/lib"]), "package-lock.json"];

    const defaultPrettierIgnore = lines.join("\n") + "\n";

    return (actual: string | null) => actual || defaultPrettierIgnore;
};
