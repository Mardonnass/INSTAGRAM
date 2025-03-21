import { PrismaClient } from "@prisma/client";

// Declare global prisma instance for development
declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

// Create PrismaClient instance (singleton pattern)
export const prisma = globalThis.prisma || new PrismaClient();

// Store PrismaClient on globalThis only in development mode to avoid multiple instances during hot reloading
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
