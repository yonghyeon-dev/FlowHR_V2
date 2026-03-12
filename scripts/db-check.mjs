import { PrismaClient } from "@prisma/client";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is missing.`);
  }
  return value;
}

async function main() {
  requireEnv("DATABASE_URL");
  requireEnv("DIRECT_URL");

  const prisma = new PrismaClient();

  try {
    const result = await prisma.$queryRawUnsafe("SELECT 1 as ok");
    console.log("Database connection ok:", result);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
