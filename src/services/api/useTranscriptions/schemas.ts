import { z } from 'zod'

export const updateSchemaInput = z.object({
  audioId: z.string().uuid(),
  transcription: z.string(),
})
