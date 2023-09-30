import axios, { AxiosInstance } from 'axios'
import { useEffect } from 'react'

import { UpdateSchemaInput } from './types'

let instanceAxios: AxiosInstance

export function useSRTs() {
  const update = async (input: UpdateSchemaInput) => {
    await instanceAxios.patch(`/${input.audioId}/srt`, {
      srt: input.srt,
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
