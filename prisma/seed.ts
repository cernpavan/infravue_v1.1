import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "admin" },
  });

  if (existingAdmin) {
    console.log("✅ Admin user already exists");
    return;
  }

  // Create default admin user
  const admin = await prisma.admin.create({
    data: {
      username: "admin",
      password: "admin",
    },
  });

  console.log("✅ Admin user created:");
  console.log(`   Username: ${admin.username}`);
  console.log(`   Password: ${admin.password}`);
  console.log("\n⚠️  Change password in production!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
