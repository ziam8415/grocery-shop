// prisma.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Ensure the DATABASE_URL is set
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing in your .env file");
}

// Create a single PrismaClient instance
export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});
