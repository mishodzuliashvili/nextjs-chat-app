import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function getTags() {
  return await prisma.tag.findMany();
}

async function createTags(tagNames: string[]) {
  return await prisma.tag.createMany({
    data: tagNames.map((tagName: string) => ({ tagName: tagName })),
    skipDuplicates: true,
  });
}

export async function GET() {
  try {
    const tags = await getTags();
    return NextResponse.json({ tags });
  } catch (e) {
    return new Response("Could not fetch tags", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { tagNames } = await request.json();
    const tags = createTags(tagNames);
    return NextResponse.json({ tags: tags });
  } catch (e) {
    return new Response("Could not create tags", { status: 500 });
  }
}
