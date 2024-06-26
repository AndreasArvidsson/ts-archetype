export const projectTypes = ["nodeApp", "nodeLib", "reactApp", "vscodeExtension"] as const;

export type ProjectType = (typeof projectTypes)[number];

export interface UpdaterConfig {
    projectType: ProjectType;
    author: string;
    authorRepository: string;
    funding?: string;
    publisher?: string;
    projectName: string;
    displayName?: string;
}
