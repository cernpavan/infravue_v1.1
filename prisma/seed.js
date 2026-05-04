const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "infravueinteriors@gmail.com" },
  });

  if (existingAdmin) {
    console.log("✅ Admin user already exists");
    console.log(`   Username: ${existingAdmin.username}`);
    return;
  }

  // Create admin user with custom credentials
  const admin = await prisma.admin.create({
    data: {
      username: "infravueinteriors@gmail.com",
      password: "infravueinteriors",
    },
  });

  console.log("✅ Admin user created:");
  console.log(`   Username: ${admin.username}`);
  console.log(`   Password: ${admin.password}`);
  console.log("\n✨ You can now login at http://localhost:3000/admin");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
