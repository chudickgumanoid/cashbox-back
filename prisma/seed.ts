import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const measures = [
    {
      code: "5114",
      name: "одн.усл",
      fullName: "Одна услуга",
    },
    {
      code: "166",
      name: "кг",
      fullName: "Килограмм",
    },
    {
      code: "112",
      name: "л",
      fullName: "Литр",
    },
    {
      code: "006",
      name: "м",
      fullName: "Метр",
    },
    {
      code: "055",
      name: "м2",
      fullName: "Квадратный метр",
    },
    {
      code: "018",
      name: "пог. м",
      fullName: "Погонный метр",
    },
    {
      code: "5208",
      name: "сут",
      fullName: "Сутки",
    },
    {
      code: "113",
      name: "м3",
      fullName: "Кубический метр",
    },
    {
      code: "778",
      name: "упак",
      fullName: "Упаковка",
    },
    {
      code: "704",
      name: "набор",
      fullName: "Набор",
    },
    {
      code: "356",
      name: "час",
      fullName: "Час",
    },
    {
      code: "362",
      name: "мес",
      fullName: "Месяц",
    },
    {
      code: "839",
      name: "компл",
      fullName: "Комплект",
    },
    {
      code: "059",
      name: "га",
      fullName: "Гектар",
    },
    {
      code: "715",
      name: "пара",
      fullName: "Пара",
    },
    {
      code: "625",
      name: "лист",
      fullName: "Лист",
    },
    {
      code: "168",
      name: "т",
      fullName: "Тонна",
    },
    {
      code: "163",
      name: "г",
      fullName: "Грамм",
    },
    {
      code: "111",
      name: "мл",
      fullName: "Миллилитр",
    },
    {
      code: "796",
      name: "шт",
      fullName: "Штука",
    },
  ];
  console.log(`Added measures: ${measures.length}`, 'measures')

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
