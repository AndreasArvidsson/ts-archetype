import type { UpdaterConfig } from "./types";

export const updateGitignore = (config: UpdaterConfig) => {
    const lines = ["/node_modules"];

    switch (config.projectType) {
        case "nodeLib":
            lines.push("/lib");
            break;
        default:
            lines.push("/out");
    }

    const defaultGitIgnore = lines.join("\n") + "\n";

    return (actual: string | null) => actual || defaultGitIgnore;
};
