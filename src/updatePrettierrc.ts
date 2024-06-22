import { json } from "file-updater";
import type { Config } from "./types";

interface PrettierConfig {
    tabWidth: number;
}

export const updatePrettierrc = (_config: Config) => {
    return json((actual: PrettierConfig | null): PrettierConfig => {
        return {
            tabWidth: 4,
            ...actual
        };
    });
};
