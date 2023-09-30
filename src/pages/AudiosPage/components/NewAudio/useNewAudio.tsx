import { useAudios } from '@/services/api/useAudios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

type UseNewAudioProps = {
  closeNewAudio: (status: boolean) => void
  isOpen: boolean
}

export enum Status {
  waiting = 'waiting',
  uploading = 'uploading',
  success = 'success',
}

export const useNewAudio = ({ closeNewAudio, isOpen }: UseNewAudioProps) => {
  const { upload, transcription } = useAudios()

  const queryClient = useQueryClient()
  const uploadAudioMutation = useMutation(upload)
  const transcriptionAudioMutation = useMutation(transcription)

  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>(Status.waiting)

  const handleFileSelected = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.currentTarget

      if (!files) {
        setAudioFile(null)

        return null
      }

      const selectedFile = files[0]

      setAudioFile(selectedFile)
    },
    [],
  )

  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      setName(value)
    },
    [],
  )

  const handleChangePrompt = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value

      setPrompt(value)
    },
    [],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!audioFile || !name || !prompt) {
        return null
      }

      setStatus(Status.uploading)

      const { audioId } = await uploadAudioMutation.mutateAsync({
        file: audioFile,
      })

      queryClient.invalidateQueries({ queryKey: ['audios'] })

      await transcriptionAudioMutation.mutateAsync({ audioId, name, prompt })

      setStatus(Status.success)
    },
    [
      audioFile,
      name,
      prompt,
      queryClient,
      transcriptionAudioMutation,
      uploadAudioMutation,
    ],
  )

  useEffect(() => {
    if (status === Status.success) {
      setTimeout(() => {
        closeNewAudio(false)
      }, 1000)
    }
  }, [closeNewAudio, status])

  useEffect(() => {
    if (!isOpen) {
      setAudioFile(null)
      setName(null)
      setPrompt(null)
      setStatus(Status.waiting)
    }
  }, [isOpen])

  return {
    fileName: audioFile?.name,
    status,

    handleSubmit,
    handleFileSelected,
    handleChangeName,
    handleChangePrompt,
  }
}
