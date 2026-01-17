import { z } from "zod";
import {ModuleSchema} from "./Module";

export const ModulesResponseSchema = z.object({
    modules: z.array(ModuleSchema),
});

export function parseModulesResponse(json: string) {
    const parsed = JSON.parse(json); // raw parse
    return ModulesResponseSchema.parse(parsed); // zod validation
}
