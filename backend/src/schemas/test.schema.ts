import { number, object, output, string } from "zod"

export const testSchema = object({
  id: string(),
  hello: string(),
  world: number(),
})

export type TestSchema = output<typeof testSchema>
