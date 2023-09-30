import axios, { AxiosInstance } from 'axios'
import { useEffect } from 'react'

import { findAllSchemaOutput, uploadSchemaOutput } from './schemas'
import { TranscriptionSchemaInput, UploadSchemaInput } from './types'

let instanceAxios: AxiosInstance

export function useAudios() {
  const findAll = async () => {
    const response = await instanceAxios.get('/')

    return findAllSchemaOutput.parse(response.data)
  }

  const upload = async (input: UploadSchemaInput) => {
    const data = new FormData()

    data.append('file', input.file)

    const response = await instanceAxios.post('/file', data)

    return uploadSchemaOutput.parse(response.data)
  }

  const transcription = (input: TranscriptionSchemaInput) => {
    return instanceAxios.post(`/${input.audioId}/str-transcription`, {
      name: input.name,
      prompt: input.prompt,
    })
  }

  useEffect(() => {
    if (!instanceAxios) {
      instanceAxios = axios.create({
        baseURL: `${import.meta.env.VITE_TRANSCRIBE_API}/audios`,
      })
    }
  }, [])

  return {
    findAll,
    upload,
    transcription,
  }
}
