import { useAudios } from '@/services/api/useAudios'
import { FindAllSchemaOutput as AudiosSchema } from '@/services/api/useAudios/types'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

import { EditType } from './components/EditAudio/useEditAudio'
import { TableActions } from './components/TableActions'

type AudioItem = AudiosSchema[number]

type EditAudioState = {
  audioId: string
  text: string
  type: EditType
}

export const useAudiosPage = () => {
  const { findAll: findAllAudios } = useAudios()

  const [isOpenNewAudio, setIsOpenNewAudio] = useState(false)
  const [isOpenEditAudio, setIsOpenEditAudio] = useState(false)
  const [selectedAudio, setSelectedAudio] = useState({} as EditAudioState)

  const { data: audios } = useQuery({
    queryKey: ['audios'],
    queryFn: findAllAudios,
    initialData: [],
    refetchInterval: 20000,
  })

  const handleClickNewAudio = () => {
    setIsOpenNewAudio(true)
  }

  const handleClickSRT = (audioId: string, srt: string | null) => {
    setSelectedAudio({
      audioId,
      text: srt ?? '',
      type: EditType.SRT,
    })

    setIsOpenEditAudio(true)
  }

  const handleClickTranscription = (
    audioId: string,
    transcription: string | null,
  ) => {
    setSelectedAudio({
      audioId,
      text: transcription ?? '',
      type: EditType.TRANSCRIPTION,
    })

    setIsOpenEditAudio(true)
  }

  const columns: ColumnDef<AudioItem>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'title',
      header: 'Nome',
    },
    {
      accessorKey: 'createdAt',
      header: 'Data',
    },
    {
      id: 'actions',
      cell: ({ row: { original } }) => (
        <TableActions
          audioId={original.id}
          status={original.status}
          srt={original.srt}
          transcription={original.transcription}
          handleClickSRT={handleClickSRT}
          handleClickTranscription={handleClickTranscription}
        />
      ),
    },
  ]

  return {
    isOpenNewAudio,
    columns,
    audios,
    isOpenEditAudio,
    setIsOpenNewAudio,
    handleClickNewAudio,
    setIsOpenEditAudio,
    selectedAudio,
  }
}
