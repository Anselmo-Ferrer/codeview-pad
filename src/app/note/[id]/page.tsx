'use client'

// import CodeRunner from '@/components/CodeRunner'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdOutlineSaveAlt } from "react-icons/md";
import { toast } from "sonner"
import { FiTrash } from "react-icons/fi";

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
  const [noteInfos, setNoteInfos] = useState<NoteInfos | null>(null)
  const [content, setContent] = useState<any>(null)
  const [initialContent, setInitialContent] = useState<any>(null)

  // ---------- PATCH ----------

  const updateNote = async () => {
    console.log(content)
    console.log(id)
    const res = await fetch('/api/update-note', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, id }),
    })

    toast("Nota salva com sucesso", {
      description: "Sua nota foi salva com sucesso!",
      style: {
        background: "linear-gradient(to bottom right, transparent, #04DEAD)",
        color: "white",
        backdropFilter: "blur(10px)",
      }
    })
    console.log("nota salva: ", res)
  }

  // ---------- GET ----------

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
      setNoteInfos(data)
      setInitialContent(data.content)
      console.log("notas:", data)
    }

    fetchNote()
  }, [id])

  // ---------- DELETE ----------

  const deleteNote = async () => {
    try {
      const res = await fetch(`/api/note/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao deletar note");
      }

      router.back();
      toast("Note deletada", {
        description: "Sua note foi deletada!",
        style: {
          background: "linear-gradient(to bottom right, transparent, #FF4C4C)",
          color: "white",
          backdropFilter: "blur(10px)",
        },
      })
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className='w-full flex flex-col justify-center p-5'>
      <div className='w-full flex items-center justify-between'>
        <p className="text-4xl font-bold tracking-tighter mb-5">{noteInfos?.name ? noteInfos?.name : "Carregando..."}</p>
        <div className='flex items-center gap-2 pb-5'>
          <button onClick={() => router.back()} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer flex items-center gap-1"><IoReturnUpBackOutline size={20}/>Voltar</button>
          <button onClick={() => setShowCode(!showCode)} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer">{showCode ? 'mostrar codigo' : 'esconder codigo'}</button>
          <button onClick={() => updateNote()} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer flex items-center gap-1"><MdOutlineSaveAlt size={20}/>Salvar nota</button>
          <button onClick={() => deleteNote()} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer flex items-center gap-1"><FiTrash size={20}/>Deletar note</button>
        </div>
      </div>
      <div>
        <div className={showCode ? 'w-full flex h-screen max-h-[calc(100vh-200px)]' : 'w-3/5 flex'}>
          {initialContent && (
            <SimpleEditor content={initialContent} onUpdate={setContent} />
          )}
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