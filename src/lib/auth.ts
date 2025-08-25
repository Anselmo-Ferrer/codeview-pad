import { NextRequest } from 'next/server'
import { supabase } from './supabaseClient'

export async function verifyUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    throw new Error('No token provided')
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    throw new Error('Invalid or expired token')
  }

  return data.user
}