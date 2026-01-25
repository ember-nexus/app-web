import { z } from "zod";

export type Module = {
    version: string;
    canBeUpgraded: boolean;
    name: string;
    description: string;
    license: string;
    source: string;
    homepage: string | null;
    transitive: boolean;
};

export const ModuleSchema = z.object({
    version: z.string(),
    canBeUpgraded: z.boolean(),
    name: z.string(),
    description: z.string(),
    license: z.string(),
    source: z.string(),
    homepage: z.string().nullable(),
    transitive: z.boolean(),
});

