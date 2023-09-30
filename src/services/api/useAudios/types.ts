import { z } from 'zod'

import {
  findAllSchemaOutput,
  transcriptionSchemaInput,
  uploadSchemaInput,
} from './schemas'

export type FindAllSchemaOutput = z.infer<typeof findAllSchemaOutput>
export type UploadSchemaInput = z.infer<typeof uploadSchemaInput>
export type TranscriptionSchemaInput = z.infer<typeof transcriptionSchemaInput>
