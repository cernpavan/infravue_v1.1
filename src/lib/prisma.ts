import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Fail loudly on cold start so the cause shows up in `wrangler tail`
    // instead of being hidden inside a generic 500 from every API route.
    throw new Error(
      "DATABASE_URL is not set. On Cloudflare set it as a Worker secret: " +
        "`npx wrangler secret put DATABASE_URL`"
    );
  }

  return new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
