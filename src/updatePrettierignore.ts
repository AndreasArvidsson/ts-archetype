import type { UpdaterConfig } from "./types";

export const updatePrettierignore = (config: UpdaterConfig) => {
    const lines = ["/node_modules"];

    switch (config.projectType) {
        case "nodeLib":
            lines.push("/lib");
            break;
        default:
            lines.push("/out");
    }

    lines.push("/package-lock.json");

    const defaultPrettierIgnore = lines.join("\n") + "\n";

    return (actual: string | null) => actual || defaultPrettierIgnore;
};
