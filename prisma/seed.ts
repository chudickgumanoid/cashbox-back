import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const measures = [
    { name: "Measure 1", fullName: "Full Measure 1", code: "1" },
    { name: "Measure 2", fullName: "Full Measure 2", code: "2" },
  ];

  await prisma.measure.createMany({
    data: measures,
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
