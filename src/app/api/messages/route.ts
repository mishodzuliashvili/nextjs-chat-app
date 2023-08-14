import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1651449",
  key: "dcb6404f028ee60eb750",
  secret: "13bf69ce9809d4309724",
  cluster: "ap2",
  useTLS: true,
});

export async function GET(request: Request) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        timestamp: "asc",
      },
      include: {
        tags: true,
      },
    });
    return NextResponse.json({ messages });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      body: "Could not fetch messages",
    });
  }
}

export async function POST(request: Request) {
  try {
    const { content, tags } = await request.json();
    const message = await prisma.message.create({
      data: {
        content,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { tagName: tag },
            create: { tagName: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    pusher.trigger("chat", "message", {
      message,
    });
    return NextResponse.json({ message });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      body: "Could not create message",
    });
  }
}
