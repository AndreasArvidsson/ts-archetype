import { generate } from "./generate";

export const generateGitignore = () => {
  const content = `
node_modules
`;

  generate(".gitignore", content.trimStart());
};
