'use client'

// import CodeRunner from '@/components/CodeRunner'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";

type NoteInfos = {
  name: string
  id: string
  createdAt: Date
  content: any
}

export default function Page() {
  const { id } = useParams()
  const router = useRouter()

  const [showCode, setShowCode] = useState<boolean>(true);
  const [noteInfos, setNoteInfos] = useState<NoteInfos>()
  const [note, setNote] = useState()

  useEffect(() => {
    // console.log("Note atuializado: ", note)
  }, [note])

  const updateNote = async () => {
    console.log(note)
    console.log(id)
    const res = await fetch('/api/update-note', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: note, id }),
    })

    console.log("nota salva: ", res)
  }

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`/api/note/${id}`, {
        method: 'GET',
      })  

      if (!res.ok) {
        console.error("Erro ao buscar notas:", await res.text())
        return
      }

      const data = await res.json()
      setNote(data)
      setNoteInfos(data)
      console.log("notas:", data)
    }

    fetchNote()
  }, [])

  return (
    <div className='w-full flex flex-col justify-center p-5'>
      <div className='w-full flex items-center justify-between'>
        <p className="text-4xl font-bold tracking-tighter mb-5">{noteInfos?.name ? noteInfos?.name : "Carregando..."}</p>
        <div className='flex items-center gap-2 pb-5'>
          <button onClick={() => router.back()} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer flex items-center gap-1"><IoReturnUpBackOutline size={20}/>Voltar</button>
          <button onClick={() => setShowCode(!showCode)} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer">{showCode ? 'mostrar codigo' : 'esconder codigo'}</button>
          <button onClick={() => updateNote()} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer">Salvar nota</button>
        </div>
      </div>
      <div>
        <div className={showCode ? 'w-full flex' : 'w-3/5 flex'}>
          <SimpleEditor content={note} onUpdate={(json) => setNote(json)}/>
        </div>
        <div className='bg-[#eeeef61c] w-[1px] flex' hidden={showCode}></div>
        <div className={showCode ? 'w-fit px-5' : 'w-2/5 px-5 gap-5 flex flex-col items-end' }>
          <div className='w-full transition-all duration-500' hidden={showCode}>
            {/* <CodeRunner /> */}
          </div>
        </div>
      </div>
    </div>
  )
}