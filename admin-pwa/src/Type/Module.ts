import { z } from "zod";

export type Module = {
    id: string;
    packageIdentifier: string;
    version: string;
    canBeUpgraded: boolean;
    name: string;
    description: string;
    license: string;
    source: string;
    homepage: string | null;
};

export const ModuleSchema = z.object({
    id: z.string(),
    packageIdentifier: z.string(),
    version: z.string(),
    canBeUpgraded: z.boolean(),
    name: z.string(),
    description: z.string(),
    license: z.string(),
    source: z.string(),
    homepage: z.string().nullable(),
});

