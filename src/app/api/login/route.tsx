import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password)
      return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 })

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({
      user: data.user,
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}