import { z } from 'zod'

export const findAllSchemaOutput = z.array(
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    template: z.string(),
  }),
)
