import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const test = await prisma.test.create({
    data: {
      text: "test",
    },
  });
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
