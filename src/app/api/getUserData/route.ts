import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = await verifyUser(req)
    console.log('User ID:', user.id)

    // Busca dados do usuário no Prisma
    const userData = await prisma.test.findMany({
      where: { user_id: user.id },
    })

    return NextResponse.json(userData)
  } catch (err) {
    console.error('Auth or backend error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Something went wrong' },
      { status: 401 }
    )
  }
}