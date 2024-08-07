import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seedInterests() {
  const interests = [];
  for (let i = 0; i < 100; i++) {
    interests.push({
      title: faker.commerce.department(),
    });
  }

  await prisma.interest.createMany({
    data: interests,
  });

  console.log("Interests data seeded!");
}

seedInterests()
  .then(async () => {
    console.log("yayy interests created!");
    await prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
