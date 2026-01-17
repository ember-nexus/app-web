import { z } from "zod";

export type Setting = {
    name: string | null;
    domain: string;
};

export const SettingSchema = z.object({
    name: z.string().nullable(),
    domain: z.string(),
});

