export interface Config {
    author: string;
    repository: string;
    projectName: string;
    displayName: string;
    outDir: string;
    react: boolean;
}

export const config: Config = {
    author: "Andreas Arvidsson",
    repository: "https://github.com/AndreasArvidsson",
    projectName: "example-project",
    displayName: "Example project",
    outDir: "generated",
    react: true,
};
