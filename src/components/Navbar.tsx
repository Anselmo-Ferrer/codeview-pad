"use client"

import Image from "next/image"
import { ThemeToggle } from "./tiptap-templates/simple/theme-toggle"
import LogoImage from '@/assets/logosaas.png'
import { GoHomeFill } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Erro ao deslogar:", error.message)
      return
    }
    router.replace('/signin')
  }

  return (
    <div className="w-full mb-5 px-5 py-3 border-b-[#eeeef61c] border-b-1 flex justify-between">
      <a href="/home" className="flex items-center gap-1 cursor-pointer">
        <Image src={LogoImage} alt="logo" className="rounded-full" />
        <p className="text-xl font-semibold">Codeview pad</p>
      </a>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <a href="/home" className="bg-[#e8e8fd0d] hover:bg-[#0E9577] transition-colors duration-[2000ms] ease-in-out rounded-md backdrop-blur-md cursor-pointer px-6 py-2 flex gap-1 items-center"><GoHomeFill />Home</a>
        <button onClick={handleLogout} className="bg-[#e8e8fd0d] hover:bg-[#0E9577] transition-colors duration-1500 ease-in-out rounded-md backdrop-blur-md cursor-pointer px-6 py-2 flex gap-1 items-center"><CiLogout />Logout</button>
      </div>
    </div>
  )
}