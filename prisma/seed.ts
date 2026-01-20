import { createPrismaClient } from "./prismaClient";

const prisma = createPrismaClient();

async function main() {
  const roles = ["SUPER_ADMIN", "ADMIN", "VENDOR", "CUSTOMER"];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: {
        name,
        isSystem: true,
      },
    });
  }

  console.log("✅ Roles seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
