import axios, { AxiosInstance } from 'axios'
import { useEffect } from 'react'

import { UpdateSchemaInput } from './types'

let instanceAxios: AxiosInstance

export function useTranscriptions() {
  const update = async (input: UpdateSchemaInput) => {
    await instanceAxios.patch(`/${input.audioId}/transcription`, {
      transcription: input.transcription,
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
    update,
  }
}
