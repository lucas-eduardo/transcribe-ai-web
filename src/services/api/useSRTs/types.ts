import { z } from 'zod'

import { updateSchemaInput } from './schemas'

export type UpdateSchemaInput = z.infer<typeof updateSchemaInput>
