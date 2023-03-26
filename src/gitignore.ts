import { Config } from "./config";
import { writeFile } from "./util";

export const generateGitignore = (config: Config) => {
    const content = `
node_modules
`;

    writeFile(config, ".gitignore", content.trimStart());
};
