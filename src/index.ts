import { generateEsbuild } from "./esbuild";
import { generateEslintrc } from "./eslintrc";
import { makeGenerateDir } from "./generate";
import { generateGitignore } from "./gitignore";
import { generateLicense } from "./license";
import { generatePackage } from "./package";
import { generatePrettierrc } from "./prettierrc";
import { generateReadme } from "./readme";
import { generateSrc } from "./src";
import { generateTest } from "./test";
import { generateTsconfig } from "./tsconfig";

console.log("Generating files");

makeGenerateDir();
generateReadme();
generateGitignore();
generateLicense();
generatePackage();
generateEsbuild();
generateTsconfig();
generatePrettierrc();
generateEslintrc();
generateSrc();
generateTest();
