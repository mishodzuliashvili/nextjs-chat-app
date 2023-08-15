import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Ably from "ably";

const ably = new Ably.Realtime.Promise(
  "kF6GTQ.ghESTw:4o49voVpJUXPgygFIsBnDr55MbpJLKUX11w5N4sq4F0"
);

(async () => {
  await ably.connection.once("connected");
  console.log("Connected to Ably!");
})();

async function getMessages() {
  return await prisma.message.findMany({
    orderBy: {
      timestamp: "asc",
    },
    include: {
      tags: true,
    },
  });
}

async function createMessage(messageContent: string, tagNames: string[]) {
  return await prisma.message.create({
    data: {
      content: messageContent,
      tags: {
        connectOrCreate: tagNames.map((tagName: string) => ({
          where: { tagName: tagName },
          create: { tagName: tagName },
        })),
      },
    },
    include: {
      tags: true,
    },
  });
}

async function publishMessage(message: Message) {
  const channel = ably.channels.get("chat");
  await channel.publish("message", message);
}

export async function GET() {
  try {
    const messages: Message[] = await getMessages();
    return NextResponse.json({ messages });
  } catch (e: any) {
    return new Response("Could not fetch messages", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { messageContent, tagNames } = await request.json();
    const message: Message = await createMessage(messageContent, tagNames);
    publishMessage(message);
    return NextResponse.json({ message });
  } catch (e: any) {
    return new Response("Could not create message", { status: 500 });
  }
}
