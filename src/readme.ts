import { displayName } from "./config";
import { generate } from "./generate";

export const generateReadme = () => {
  const content = `
# ${displayName}
`;

  generate("README.md", content.trimStart());
};
