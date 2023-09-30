import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { useAudios } from '@/services/api/useAudios'
import { usePrompts } from '@/services/api/usePrompts'
import { useQuery } from '@tanstack/react-query'
import { useCompletion } from 'ai/react'
import { Wand2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function HomePage() {
  const { findAll: findAudios } = useAudios()
  const { findAll: findPromps } = usePrompts()
  const [audioId, setAudioId] = useState<string | null>(null)
  const [temperatures, setTemperatures] = useState<number[]>([0.5])

  const audiosQuery = useQuery({
    queryKey: ['select', 'audios'],
    queryFn: findAudios,
    initialData: [],
  })
  const promptsQuery = useQuery({
    queryKey: ['select', 'prompts'],
    queryFn: findPromps,
    initialData: [],
  })

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${
      import.meta.env.VITE_TRANSCRIBE_API
    }/audios/${audioId}/execute-prompt`,
    body: {
      temperature: temperatures[0],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const handleSelectedPrompt = (promptId: string) => {
    const promptTemplate = promptsQuery.data.find(({ id }) => id === promptId)

    setInput(promptTemplate?.template ?? '')
  }

  return (
    <div className="h-screen w-full bg-background">
      <form onSubmit={handleSubmit} className="m-auto w-2/3 space-y-5 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-x-3">
              <Select onValueChange={setAudioId}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione um áudio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {audiosQuery.data.map((audio) => (
                      <SelectItem key={audio.id} value={audio.id}>
                        {audio.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={handleSelectedPrompt}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione um prompt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {promptsQuery.data.map((prompt) => (
                      <SelectItem key={prompt.id} value={prompt.id}>
                        {prompt.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Link to="/audios">
              <Button>Listagem de áudios</Button>
            </Link>
          </div>

          <Textarea
            className="h-56 resize-y p-4 leading-relaxed"
            placeholder="Inclua o prompt para a IA..."
            value={input}
            onChange={handleInputChange}
          />

          <Textarea
            className="h-56 resize-y p-4 leading-relaxed"
            placeholder="Resultado gerado pela IA..."
            value={completion}
            readOnly
          />

          <div className="w-1/2 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Temperatura</Label>
              <span className="text-xs text-muted-foreground">
                {temperatures}
              </span>
            </div>

            <Slider
              id="temperature"
              min={0}
              max={1}
              value={temperatures}
              step={0.1}
              onValueChange={(value) => setTemperatures(value)}
            />

            <span className="block text-xs italic leading-relaxed text-muted-foreground">
              * Valores mais altos costumam resultar em maior criatividade, mas
              também podem levar a possíveis erros.
            </span>
          </div>
        </div>

        <Button type="submit" className="m-auto" size="lg" disabled={isLoading}>
          Executar <Wand2 className="ml-2 h-4 w-4" />
        </Button>

        <p className="m-auto text-xs">
          Lembre-se: você pode utilizar a variável{' '}
          <code className="text-violet-400">{'{transcription}'}</code> no seu
          prompt para adicionar o conteúdo da transcrição do áudio selecionado
        </p>
      </form>
    </div>
  )
}
