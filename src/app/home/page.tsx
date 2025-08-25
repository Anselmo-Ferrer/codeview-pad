'use client'

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Stacks = {
  id: string
  name: string
}

export default function Page() {

  const router = useRouter()

  const [stackName, setStackName] = useState<string>('');
  const [userId, setUserId] = useState<string>('')

  const [stacks, setStacks] = useState<Stacks[]>([])
 
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/signin')
      } else {
        const { id, email } = session.user
        setUserId(id)
        // setUserEmail(email || '')
        // setUserId(id || '')

        await fetch('/api/sync-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, email, name: '', password: '' })
        })

        // setLoading(false)
      }
    }

    checkSession()
  }, [router])

  useEffect(() => {
    if (userId) {
      fetchStacks()
    }
  }, [userId])

  const handleJavascript = async () => {
    const res = await fetch('/api/stack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: stackName, userId})
    })

    const data = res.json
    console.log(data)
  }

  const fetchStacks = async () => {
    if (!userId) return;

    const res = await fetch(`/api/stack?userId=${userId}`, {
      method: 'GET',
    })

    if (!res.ok) {
      console.error("Erro ao buscar stacks:", await res.text())
      return
    }

    const data = await res.json()
    setStacks(data)
    console.log("Stacks:", data)
  }

  return (
    <div>
      <p className="text-4xl">Home Page</p>
      <input onChange={(e) => setStackName(e.target.value)} type="text" name="" id="" />
      <button onClick={() => handleJavascript()} className="cursor-pointer p-5 bg-blue-300">JAVASCRIPT</button>
      <div className="flex items-center gap-3">
        {stacks.map(item => (
          <div key={item.id} onClick={() => router.push(`/stack/${item.id}`)} className="p-5 w-40 h-40 border-1 cursor-pointer">
            {item.name}
          </div>
        ))} 
      </div>
    </div>
  )
}