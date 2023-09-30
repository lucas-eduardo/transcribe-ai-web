import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

type TableActionsProps = {
  audioId: string
  status: string
  srt: string | null
  transcription: string | null
  handleClickSRT: (audioId: string, srt: string | null) => void
  handleClickTranscription: (
    audioId: string,
    transcription: string | null,
  ) => void
}

export function TableActions({
  audioId,
  status,
  srt,
  transcription,
  handleClickSRT,
  handleClickTranscription,
}: TableActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      <Button
        variant="outline"
        size="sm"
        className="flex flex-row gap-2"
        disabled={status !== 'success'}
        onClick={() => handleClickSRT(audioId, srt)}
      >
        <Eye className="h-4 w-4" /> SRT
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="flex flex-row gap-2"
        disabled={status !== 'success'}
        onClick={() => handleClickTranscription(audioId, transcription)}
      >
        <Eye className="h-4 w-4" /> Transcrição
      </Button>
    </div>
  )
}
