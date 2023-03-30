import { Config } from "./config";
import { writeFile } from "./util";

export const generatePrettierrc = (config: Config) => {
    const content = {
        tabWidth: 4
    };

    writeFile(config, ".prettierrc.json", content);
};
