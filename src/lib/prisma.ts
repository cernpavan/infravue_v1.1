import { PrismaClient } from "@prisma/client";
import { PrismaNeonHTTP } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // Throw a Prisma-shaped error so the route handler can match it and
    // return a structured 503. (A plain `Error` thrown here would crash the
    // module-load, producing Cloudflare's opaque text/plain 500 instead.)
    const err = new Error(
      "DATABASE_URL is not set. On Cloudflare set it as a Worker secret: " +
        "`npx wrangler secret put DATABASE_URL`"
    );
    (err as Error & { code?: string }).code = "MISSING_DATABASE_URL";
    throw err;
  }

  return new PrismaClient({
    adapter: new PrismaNeonHTTP(connectionString, {
      fetchOptions: {
        cache: "no-store",
      },
    }),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

/**
 * Lazy proxy — the underlying client is only constructed on first property
 * access. This means a missing env var (or bad connection string) fails
 * inside a request's try/catch rather than at module-load time, so the
 * client receives a JSON error from our route handler instead of
 * Cloudflare's generic text/plain 500.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createClient();
    }
    const value = Reflect.get(globalForPrisma.prisma, prop, receiver);
    return typeof value === "function"
      ? value.bind(globalForPrisma.prisma)
      : value;
  },
});
