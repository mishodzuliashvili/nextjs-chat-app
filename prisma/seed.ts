import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const test = await prisma.message.create({
    data: {
      content: "testia",
    },
  });
  // await prisma.tag.create({
  //   data: {
  //     tagName: "testia",
  //   },
  // });
  console.log({ test });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// model Test {
//   id   String @id @default(uuid())
//   text String
// }
