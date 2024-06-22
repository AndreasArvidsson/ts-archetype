import type { Config } from "./types";

export const updateReadme = (config: Config) => {
    const defaultReadme = `
# ${config.displayName ?? config.projectName}
`.trimStart();

    return (actual: string | null): string => {
        return actual || defaultReadme;
    };
};
