import { object, string } from "zod"

export const configSchema = object({
  SWAGGER_TITLE: string().optional(),
  SWAGGER_DESCRIPTION: string().optional(),
  SWAGGER_VERSION: string()
    .optional()
    .transform((version: string) => Number(version)),
  DATABASE_URL: string(),
})
