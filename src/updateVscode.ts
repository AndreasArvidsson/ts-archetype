import { json } from "file-updater";
import type { UpdaterConfig } from "./types";

interface VscodeSettings {
    ["editor.defaultFormatter"]: string;
}

export const updateVscodeSettings = (_config: UpdaterConfig) => {
    return json((actual: VscodeSettings | null): VscodeSettings => {
        return {
            ["editor.defaultFormatter"]: "esbenp.prettier-vscode",
            ...(actual ?? {}),
        };
    });
};
