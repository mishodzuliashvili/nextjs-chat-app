import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const tags = await prisma.tag.findMany();
    return NextResponse.json({ tags });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      body: "Could not fetch tags",
    });
  }
}

export async function POST(request: Request) {
  try {
    const { tags } = await request.json();
    console.log({ tags });
    const tempTags = await prisma.tag.createMany({
      data: tags.map((tag: string) => ({ tagName: tag })),
      skipDuplicates: true,
    });
    return NextResponse.json({ tags: tempTags });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      body: "Could not create tags",
    });
  }
}
