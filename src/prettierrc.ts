import { generate } from "./generate";

export const generatePrettierrc = () => {
    const content = {
        tabWidth: 4,
    };

    generate(".prettierrc", content);
};
