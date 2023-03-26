import { Config } from "./config";
import { writeFile } from "./util";

export const generateReadme = (config: Config) => {
    const content = `
# ${config.displayName}
`;

    writeFile(config, "README.md", content.trimStart());
};
