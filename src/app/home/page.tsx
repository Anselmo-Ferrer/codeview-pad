'use client'

import { AddStack } from "@/components/AddStack"
import { iconsMap } from "../data/iconsMap"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Stacks = {
  id: string
  name: string
}

export default function Page() {
  const router = useRouter()
  const [stackValue, setStackValue] = useState<string>('');
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

  const handleAddStack = async () => {
    const res = await fetch('/api/stack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: stackValue, userId})
    })

    console.log("Card criado: ", res)
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
    <div className="p-10">
      <p className="text-4xl font-bold tracking-tighter mb-5">Your Stacks</p>
      <div className="w-full flex items-center gap-3">
        <input className="border-[#e8e8fd0d] bg-[#e8e8fd0d] backdrop-blur-md border-2 py-2 h-[45px] px-1 w-[500px] outline-none rounded-md plaholder:text-white" placeholder="Search stacks..." type="text" name="" id="" />
        <AddStack onValueChange={(value: string) => setStackValue(value)}/>
        <button onClick={() => handleAddStack()} className="bg-[#e8e8fd0d] backdrop-blur-md border-[#2a2a2a] border hover:bg-[#eeeef61c] h-[45px] px-4 rounded-md cursor-pointer">Adicionar</button>
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-10">
        {stacks.map(item => {
          const iconKey = item.name.toLowerCase().replace(/\s+/g, '');
          const iconClass = iconsMap[iconKey] || 'devicon-code-plain text-fit';
          return (
            <button key={item.id} onClick={() => router.push(`/stack/${item.id}`)} className="p-5 w-40 h-60 bg-[#e8e8fd0d] backdrop-blur-md border border-[#e8e8fd0d] hover:border-[#04DEAD] transition-all duration-500 rounded-lg cursor-pointer flex items-center flex-col">
              <div className="rounded-md inline-flex items-center justify-center p-2">
                <i className={`${iconClass} colored text-[120px]`}></i>
              </div>
              <div className="flex w-full flex-col gap-1 pt-2">
                <p className="font-semibold text-xl">{item.name}</p>
                <p className="font-light text-sm text-white/50">Language</p>
              </div>
            </button>
          )
        })} 
      </div>
    </div>
  )
}