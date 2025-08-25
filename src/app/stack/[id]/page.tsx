'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
    <div>
      <p className="text-4xl">{id}</p>
      <input onChange={(e) => setNoteName(e.target.value)} type="text" />
      <button onClick={() => saveNote()} className="bg-blue-700 p-5 cursor-pointer hover:bg-blue-500">Criar nota</button>
      <div className="flex gap-4">
        {notes.map(item => (
          <button onClick={() => router.push(`/note/${item.id}`)} key={item.id} className="border-1 p-4 cursor-pointer bg-blue-600">
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}