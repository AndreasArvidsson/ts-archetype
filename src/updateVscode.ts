import { json } from "file-updater";
import type { Config } from "./types";

interface VscodeSettings {
    ["editor.defaultFormatter"]: string;
}

export const updateVscodeSettings = (_config: Config) => {
    return json((actual: VscodeSettings | null): VscodeSettings => {
        return {
            ["editor.defaultFormatter"]: "esbenp.prettier-vscode",
            ...(actual ?? {}),
        };
    });
};
