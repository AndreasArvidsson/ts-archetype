import { Config } from "./config";
import { generateEsbuild } from "./esbuild";
import { generateEslintrc } from "./eslintrc";
import { makeGenerateDir } from "./util";
import { generateGitignore } from "./gitignore";
import { generateLicense } from "./license";
import { generatePackage } from "./package";
import { generatePrettierrc } from "./prettierrc";
import { generateReadme } from "./readme";
import { generateSrc } from "./src";
import { generateTest } from "./test";
import { generateTsconfig } from "./tsconfig";

export const generate = (config: Config) => {
    console.log("Generating files");

    makeGenerateDir(config);
    generateReadme(config);
    generateGitignore(config);
    generateLicense(config);
    generatePackage(config);
    generateEsbuild(config);
    generateTsconfig(config);
    generatePrettierrc(config);
    generateEslintrc(config);
    generateSrc(config);
    generateTest(config);
};
