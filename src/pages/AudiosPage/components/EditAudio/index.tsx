import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import { EditType, useEditAudio } from './useEditAudio'

type EditAudioProps = {
  audio: {
    audioId: string
    text: string
    type: EditType
  }
  isOpenEdit: boolean
  handleChangeOpen: (status: boolean) => void
}

type RenderHeaderProps = {
  type: EditType
}

export function RenderHeader({ type }: RenderHeaderProps) {
  if (type === EditType.SRT) {
    return (
      <>
        <SheetTitle>SRT</SheetTitle>
        <SheetDescription>
          Faça edições no SRT aqui, se necessário. Clique em{' '}
          <span className="font-semibold text-primary">Salvar</span> quando
          terminar.
        </SheetDescription>
      </>
    )
  }

  return (
    <>
      <SheetTitle>Transcrição</SheetTitle>
      <SheetDescription>
        Faça edições da transcrição aqui, se necessário. Clique em{' '}
        <span className="font-semibold text-primary">Salvar</span> quando
        terminar.
      </SheetDescription>
    </>
  )
}

export function EditAudio({
  isOpenEdit,
  handleChangeOpen,
  audio,
}: EditAudioProps) {
  const { textAreaRef, handleSubmit } = useEditAudio({
    handleChangeOpen,
    type: audio.type,
    audioId: audio.audioId,
  })

  return (
    <Sheet open={isOpenEdit} onOpenChange={handleChangeOpen}>
      <SheetContent side="bottom" className="h-3/5 space-y-6">
        <SheetHeader>
          <RenderHeader type={audio.type} />
        </SheetHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Textarea
            ref={textAreaRef}
            className="h-80 resize-none leading-relaxed"
            placeholder="Adicione o texto aqui."
            defaultValue={audio.text}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
