import { PrismaClient } from "@prisma/client";

// Ensure a single instance of PrismaClient in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma; // In development, store the PrismaClient on globalThis
}
