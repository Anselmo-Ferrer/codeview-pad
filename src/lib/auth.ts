import { NextRequest } from 'next/server'
import { supabase } from './supabaseClient'

export async function verifyUser(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1] || localStorage.getItem('access_token')
  if (!token) throw new Error('No token provided')

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) throw new Error('Invalid or expired token')

  return data.user
}