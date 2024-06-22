import type { Config } from "./types";

export const updateGitignore = (config: Config) => {
    const lines = ["node_modules"];

    if (!config.react) {
        lines.push("/lib");
    }

    const defaultGitIgnore = lines.join("\n") + "\n";

    return (actual: string | null) => actual || defaultGitIgnore;
};
