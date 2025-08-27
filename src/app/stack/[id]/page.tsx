'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoReturnUpBackOutline } from "react-icons/io5";

type Notes = {
  id: string
  name: string,
  createdAt: Date
}

export default function Page() {
  const { id } = useParams()
  const router = useRouter()

  const [noteName, setNoteName] = useState<string>('')
  const [notes, setNotes] = useState<Notes[]>([])

  const saveNote = async () => {
    const res = await fetch('/api/note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: noteName, stackId: id})
    })

    const data = await res.json
    console.log(data)
    console.log('nota criada')
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch(`/api/note?stackId=${id}`, {
        method: 'GET',
      })  

      if (!res.ok) {
        console.error("Erro ao buscar notas:", await res.text())
        return
      }

      const data = await res.json()
      setNotes(data)
      console.log("notas:", data)
    }

    fetchNotes()
  }, [])



  return (
    <div className="p-10">
      <p className="text-4xl font-bold tracking-tighter mb-5">Your Stack Notes</p>
      <div className="w-full flex items-center gap-3">
        <button onClick={() => router.back()} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer flex items-center gap-1"><IoReturnUpBackOutline size={20}/>Voltar</button>
        <input onChange={(e) => setNoteName(e.target.value)} className="border-[#e8e8fd0d] bg-[#e8e8fd0d] backdrop-blur-md border-2 py-2 h-[45px] px-1 w-[500px] outline-none rounded-md plaholder:text-white" placeholder="Note name" type="text" name="noteName" id="noteName" />
        <button onClick={() => saveNote()} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#e8e8fd0d] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer">Adicionar</button>
      </div>
      <div className="flex gap-4 py-5">
        {notes.map(item => (
          <button onClick={() => router.push(`/note/${item.id}`)} key={item.id} className="p-5 w-full h-12 bg-[#181818] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg cursor-pointer flex items-center">
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}