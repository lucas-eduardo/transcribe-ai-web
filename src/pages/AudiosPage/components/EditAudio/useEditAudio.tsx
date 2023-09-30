import { useSRTs } from '@/services/api/useSRTs'
import { useTranscriptions } from '@/services/api/useTranscriptions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useCallback, useRef } from 'react'

export enum EditType {
  SRT = 'srt',
  TRANSCRIPTION = 'Transcription',
}

type UseEditAudioProps = {
  type: EditType
  audioId: string
  handleChangeOpen: (status: boolean) => void
}

export const useEditAudio = ({
  handleChangeOpen,
  type,
  audioId,
}: UseEditAudioProps) => {
  const { update: updateTranscription } = useTranscriptions()
  const { update: updateSRT } = useSRTs()

  const queryClient = useQueryClient()
  const updateTranscriptionMutation = useMutation(updateTranscription)
  const updateSRTMutation = useMutation(updateSRT)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const onSuccess = useCallback(() => {
    queryClient.refetchQueries({
      queryKey: ['audios'],
    })

    handleChangeOpen(false)
  }, [handleChangeOpen, queryClient])

  const handleEditSRT = useCallback(() => {
    const srt = textAreaRef.current?.value ?? ''

    updateSRTMutation.mutate(
      { audioId, srt },
      {
        onSuccess,
      },
    )
  }, [audioId, onSuccess, updateSRTMutation])

  const handleEditTranscription = useCallback(() => {
    const transcription = textAreaRef.current?.value ?? ''

    updateTranscriptionMutation.mutate(
      { audioId, transcription },
      {
        onSuccess,
      },
    )
  }, [audioId, onSuccess, updateTranscriptionMutation])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      if (type === EditType.SRT) {
        return handleEditSRT()
      }

      return handleEditTranscription()
    },
    [handleEditSRT, handleEditTranscription, type],
  )

  return {
    textAreaRef,
    handleSubmit,
  }
}
