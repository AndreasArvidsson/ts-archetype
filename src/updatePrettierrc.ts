import { json } from "file-updater";
import type { UpdaterConfig } from "./types";

interface PrettierConfig {
    tabWidth: number;
    printWidth: number;
}

export const updatePrettierrc = (_config: UpdaterConfig) => {
    return json((actual: PrettierConfig | null): PrettierConfig => {
        return {
            tabWidth: 4,
            printWidth: 100,
            ...actual,
        };
    });
};
