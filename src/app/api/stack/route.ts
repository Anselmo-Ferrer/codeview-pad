import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, userId } = await req.json()

  if (!name || !userId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const stack = await prisma.stack.create({
      data: {
        name,
        userId
      }
    })

    return NextResponse.json(stack, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req:Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const stacks = await prisma.stack.findMany({
      where: {userId},
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json(stacks, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}