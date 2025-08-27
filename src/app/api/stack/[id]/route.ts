import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE( req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  if (!id) {
    return NextResponse.json({ error: 'Missing stack ID' }, { status: 400 })
  }

  try {
    await prisma.note.deleteMany({ where: { stackId: id } })

    await prisma.stack.deleteMany({ where: { id: id } })

    return NextResponse.json({ message: 'Stack deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar stack:', error)
    return NextResponse.json({ error: 'Erro interno ao deletar stack' }, { status: 500 })
  }
}