import { format } from 'date-fns'
import { z } from 'zod'

export const findAllSchemaOutput = z.array(
  z.object({
    id: z.string().uuid(),
    status: z.string(),
    title: z.string(),
    srt: z.string().nullable(),
    transcription: z.string().nullable(),
    createdAt: z
      .string()
      .transform((date) => format(new Date(date), 'dd/MM/yyyy')),
  }),
)

export const uploadSchemaInput = z.object({
  file: z.instanceof(File),
})

export const uploadSchemaOutput = z.object({
  audioId: z.string().uuid(),
})

export const transcriptionSchemaInput = z.object({
  name: z.string(),
  audioId: z.string().uuid(),
  prompt: z.string(),
})
