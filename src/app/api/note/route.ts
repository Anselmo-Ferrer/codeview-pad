import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
  const { name, stackId } = await req.json()

  if (!name || !stackId) {
    return NextResponse.json({error: "Missing Fields"}, {status: 400})
  }

  try {
    const note = await prisma.note.create({
      data: {
        name,
        content: '',
        stackId
      }
    })

  return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req:Request) {
  const { searchParams } = new URL(req.url)
  const stackId = searchParams.get('stackId')

  if (!stackId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const notes = await prisma.note.findMany({
      where: {stackId},
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    })

    return NextResponse.json(notes, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}