import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, FileAudio } from 'lucide-react'

import { Status, useNewAudio } from './useNewAudio'

type NewAudioProps = {
  isOpen: boolean
  handleChangeOpen: (status: boolean) => void
}

type RenderFileLabelProps = {
  fileName?: string
}

type RenderStatus = {
  status: Status
}

function RenderFileLabel({ fileName }: RenderFileLabelProps) {
  if (fileName) {
    return fileName
  }

  return (
    <>
      <FileAudio className="h-4 w-4" /> Selecione um áudio
    </>
  )
}

function RenderStatus({ status }: RenderStatus) {
  if (status === Status.success) {
    return (
      <span className="flex items-center justify-center gap-x-2 text-lg font-medium text-emerald-500">
        <CheckCircle className="h-5 w-5" /> Arquivo adicionado com sucesso!
      </span>
    )
  }

  if (status === Status.uploading) {
    return <span>Subindo...</span>
  }

  return <Button type="submit">Enviar áudio</Button>
}

export function NewAudio({ isOpen, handleChangeOpen }: NewAudioProps) {
  const {
    fileName,
    status,
    handleSubmit,
    handleFileSelected,
    handleChangeName,
    handleChangePrompt,
  } = useNewAudio({ closeNewAudio: handleChangeOpen, isOpen })

  return (
    <Sheet open={isOpen} onOpenChange={handleChangeOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Novo áudio</SheetTitle>
          <SheetDescription>
            Selecione o áudio que deseja enviar e faça as configurações
            necessárias. Em seguida, clique em{' '}
            <span className="font-semibold text-primary">Enviar áudio</span>{' '}
            para concluir o processo.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="my-8 flex flex-col gap-y-4">
          <label
            htmlFor="audio"
            className="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-5 text-sm"
          >
            <RenderFileLabel fileName={fileName} />
          </label>

          <input
            type="file"
            id="audio"
            accept="audio/mp3"
            className="sr-only"
            onChange={handleFileSelected}
          />

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>

            <Input
              id="name"
              className="leading-relaxed"
              placeholder="Adicione o nome do áudio."
              onChange={handleChangeName}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>

            <Textarea
              id="transcription_prompt"
              className="h-20 resize-none leading-relaxed"
              placeholder="Adicione palavras-chave mencionadas no áudio, separando-as por vírgulas (,)."
              onChange={handleChangePrompt}
            />
          </div>

          <Separator />

          <RenderStatus status={status} />
        </form>
      </SheetContent>
    </Sheet>
  )
}
