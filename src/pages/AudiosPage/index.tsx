import { DataTable } from '@/components/Table'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { EditAudio } from './components/EditAudio'
import { NewAudio } from './components/NewAudio'
import { useAudiosPage } from './useAudiosPage'

export function AudiosPage() {
  const {
    isOpenNewAudio,
    setIsOpenNewAudio,
    handleClickNewAudio,
    columns,
    audios,
    isOpenEditAudio,
    setIsOpenEditAudio,
    selectedAudio,
  } = useAudiosPage()

  return (
    <div className="h-screen w-full bg-background">
      <div className="m-auto w-1/2 p-6">
        <header className="flex items-center justify-between py-3">
          <div className="flex items-center gap-x-3">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft />
              </Button>
            </Link>

            <h2 className="text-lg leading-relaxed">Áudios disponíveis</h2>
          </div>

          <Button type="button" onClick={handleClickNewAudio}>
            Enviar novo áudio
          </Button>
        </header>

        <DataTable columns={columns} data={audios} />
      </div>

      <NewAudio isOpen={isOpenNewAudio} handleChangeOpen={setIsOpenNewAudio} />
      <EditAudio
        isOpenEdit={isOpenEditAudio}
        handleChangeOpen={setIsOpenEditAudio}
        audio={selectedAudio}
      />
    </div>
  )
}
