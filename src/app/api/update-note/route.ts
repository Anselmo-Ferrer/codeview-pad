import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { content, id } = await req.json();

  const updatedNote = await prisma.note.update({
    where: { id },
    data: { content },
  });

  return NextResponse.json(updatedNote);
}