import type { UpdaterConfig } from "./types";

export const updateReadme = (config: UpdaterConfig) => {
    const defaultReadme = `
# ${config.displayName ?? config.projectName}
`.trimStart();

    return (actual: string | null): string => {
        return actual || defaultReadme;
    };
};
