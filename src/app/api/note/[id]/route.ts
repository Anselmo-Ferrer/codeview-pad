import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET( req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const notes = await prisma.note.findUnique({
      where: {id},
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true
      }
    })

    return NextResponse.json(notes, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE( req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  if (!id) {
    return NextResponse.json({ error: 'Missing Note ID' }, { status: 400 })
  }

  try {
    await prisma.note.deleteMany({ where: { id: id } })

    return NextResponse.json({ message: 'Note deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar Note:', error)
    return NextResponse.json({ error: 'Erro interno ao deletar Note' }, { status: 500 })
  }
}