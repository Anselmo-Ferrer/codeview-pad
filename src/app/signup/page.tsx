'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import desktopImage from '@/assets/Desktop.png'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      alert(error.message)
    } else {
      alert('Cadastro realizado! Verifique seu e-mail.')
      router.push('/signin')
    }
  }

  return (
    <main className="bg-[#181818] flex w-full h-screen">

      <div className="relative w-1/2 lg:w-2/3 h-screen bg-[#5067ff] flex flex-col justify-center items-center">
        <div className='absolute left-[-300px] top-[-300px] bg-[#3f54cc] w-[800px] h-[800px] rounded-full z-1'></div>
        <Image src={desktopImage} alt="desktop image" className='z-2 w-[700px] hover:scale-102 transition duration-300 ease-in-out rounded-xl mb-5'/>
       <h2 className="text-6xl text-white font-bold mb-5">
        Novos recursos introduzidos
      </h2>
      <p className="text-white/60 text-center">
        O Flashwise agora gera resumos ainda mais precisos, flashcards interativos e quizzes dinâmicos<br />
        com base no seu ritmo de aprendizagem. Tudo com o apoio da inteligência artificial.
      </p>
      </div>

      <div className="w-1/2 lg:w-1/3 h-screen p-10">
        <Link href="/" className="text-4xl cursor-pointer font-bold bg-gradient-to-r from-[#5067ff] via-[#5067ff] to-[#fff]/90 text-transparent bg-clip-text transition duration-300 transform hover:scale-105 hover:brightness-110">
          Chatlish
        </Link>
        <div className="px-5 py-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl text-white font-bold">Registrar</h1>
            <div className="flex gap-1 items-center mt-3 mb-5">
              <p className="text-[#718096]">Tem uma conta?</p>
              <Link href="/signin" className="cursor-pointer text-white border-b border-transparent hover:border-[#5067ff] transition duration-150">
                Entrar
              </Link>
            </div>
          </div>
          <form onSubmit={handleSignup} className="w-full mt-5">
            <p className="text-white text-md">E-mail</p>
            <input
              className="w-full p-2 border border-gray-300 rounded text-white placeholder-[#718096] mt-2 rounded-xl focus:outline-none focus:border-[#5067ff] focus:ring-2 focus:ring-[#5067ff]"
              type="email"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-white text-md mt-5">Senha</p>
            <input
              className="w-full p-2 border border-gray-300 rounded text-white placeholder-[#718096] mt-2 rounded-xl focus:outline-none focus:border-[#5067ff] focus:ring-2 focus:ring-[#5067ff]"
              type="password"
              placeholder="$#*%1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-full cursor-pointer bg-[#5067ff] hover:bg-[#3f54cc] text-black py-3 rounded-xl my-5 transition duration-300">
              Registrar
            </button>
          </form>
        </div>
      </div>

    </main>
  )
}