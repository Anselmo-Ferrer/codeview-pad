'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import desktopImage from '@/assets/Desktop.png'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem('rememberMe')
    if (saved !== null) {
      setRememberMe(saved === 'true')
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const loginRes = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const loginData = await loginRes.json()

    if (loginData.error) {
      alert('Erro ao fazer login: ' + loginData.error.message)
    } else {
      const token = loginData.access_token
      console.log(token)
      if (token) {
        router.push(`/home`)
      } else {
        alert('Usuário não encontrado.')
      }
    }
  }

  return (
    <main className="bg-[#181818] flex w-full h-screen">
      <div className="w-1/2 lg:w-1/3 h-screen p-10">
        <Link href="/" className="text-4xl cursor-pointer font-bold bg-gradient-to-r from-[#5067ff] via-[#5067ff] to-[#fff]/90 text-transparent bg-clip-text transition duration-300 transform hover:scale-105 hover:brightness-110">
          Chatlish
        </Link>
        <div className="px-5 py-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl text-white font-bold">Entrar</h1>
            <div className="flex gap-1 items-center mt-3 mb-5">
              <p className="text-[#718096]">Não tem uma conta?</p>
              <Link
                href="/signup"
                className="cursor-pointer text-white border-b border-transparent hover:border-[#5067ff] transition duration-150"
              >
                Crie agora
              </Link>
            </div>
          </div>
          <form onSubmit={handleLogin} className="w-full mt-5">
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
            <div className="w-full flex justify-between mt-7 mb-5">
              <label className="flex items-center gap-2 text-[#718096] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#5067ff] w-4 h-4 cursor-pointer"
                />
                Lembrar de mim
              </label>
              <Link href='/forgot-password' className="cursor-pointer text-white border-b border-transparent hover:border-[#5067ff] transition duration-150">Esqueceu a senha?</Link>
            </div>
            <button className="w-full cursor-pointer bg-[#5067ff] hover:bg-[#3f54cc] text-white py-3 rounded-xl my-5 transition duration-300">
              Entrar
            </button>
          </form>
          <div className="flex items-center gap-4 mt-5 mb-10">
            <div className="flex-grow border-t border-gray-300"></div>
            <p className="text-gray-500">OU</p>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex flex-col gap-5">
            <button className="w-full cursor-pointer text-white border flex items-center justify-center rounded-xl py-2 text-[#718096] border-[#718096] gap-3 transition duration-300 hover:bg-[#3f54cc]">
              <FcGoogle />
              Continue com Google
            </button>
            <button className="w-full cursor-pointer text-white border flex items-center justify-center rounded-xl py-2 text-[#718096] border-[#718096] gap-3 transition duration-300 hover:bg-[#3f54cc]">
              <SiFacebook color="#fff" />
              Continue com Facebook
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-1/2 lg:w-2/3 h-screen bg-[#5067ff] flex flex-col justify-center items-center">
        <div className='absolute right-[-300px] top-[-300px] bg-[#3f54cc] w-[800px] h-[800px] rounded-full z-1'></div>
        <Image src={desktopImage} alt="desktop image" className='z-2 w-[700px] hover:scale-102 transition duration-300 ease-in-out rounded-xl mb-5'/>
       <h2 className="text-6xl text-white font-bold mb-5">
        Novos recursos introduzidos
      </h2>
      <p className="text-white/60 text-center">
        Chatlish is your new partner to master English. Chat with an AI that simulates real conversations, create personalized <br/>study plans, organize your flashcards, and test your skills with smart quizzes.
      </p>
      </div>
    </main>
  )
}