import axios, { AxiosInstance } from 'axios'
import { useEffect } from 'react'

import { findAllSchemaOutput } from './schemas'

let instanceAxios: AxiosInstance

export function usePrompts() {
  const findAll = async () => {
    const response = await instanceAxios.get('/enabled')

    return findAllSchemaOutput.parse(response.data)
  }

  useEffect(() => {
    if (!instanceAxios) {
      instanceAxios = axios.create({
        baseURL: `${import.meta.env.VITE_TRANSCRIBE_API}/prompts`,
      })
    }
  }, [])

  return {
    findAll,
  }
}
