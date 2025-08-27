import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request, context: { params: { id: string } }) {
  const { params } = await context;
  const { id } = params;

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