const { PrismaClient } = require("../lib/generated/prisma/index.js");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // Clean existing data
  await prisma.classBooking.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.gymClass.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.user.deleteMany();
  console.log("🧹 Cleared existing data.\n");

  // ─── Create Users ───
  const admin = await prisma.user.create({
    data: {
      name: "Aravindhan",
      email: "aravindhan@titanflow.com",
      role: "ADMIN",
    },
  });

  const trainer1 = await prisma.user.create({
    data: {
      name: "Vikram Singh",
      email: "vikram@titanflow.com",
      role: "TRAINER",
    },
  });

  const trainer2 = await prisma.user.create({
    data: {
      name: "Priya Sharma",
      email: "priya@titanflow.com",
      role: "TRAINER",
    },
  });

  const member1 = await prisma.user.create({
    data: {
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      role: "MEMBER",
    },
  });

  const member2 = await prisma.user.create({
    data: {
      name: "Sneha Reddy",
      email: "sneha@gmail.com",
      role: "MEMBER",
    },
  });

  const member3 = await prisma.user.create({
    data: {
      name: "Arjun Patel",
      email: "arjun@gmail.com",
      role: "MEMBER",
    },
  });

  const member4 = await prisma.user.create({
    data: {
      name: "Divya Nair",
      email: "divya@gmail.com",
      role: "MEMBER",
    },
  });

  const member5 = await prisma.user.create({
    data: {
      name: "Karthik Rajan",
      email: "karthik@gmail.com",
      role: "MEMBER",
    },
  });

  console.log("✅ Created 8 users (1 admin, 2 trainers, 5 members)");

  // ─── Create Membership Plans ───
  const basicPlan = await prisma.membershipPlan.create({
    data: {
      name: "Basic",
      description: "Access to gym floor and basic equipment. Perfect for beginners.",
      price: 999,
      duration: 30,
    },
  });

  const proPlan = await prisma.membershipPlan.create({
    data: {
      name: "Pro",
      description: "Full gym access + group classes + locker room. Most popular!",
      price: 1999,
      duration: 30,
    },
  });

  const elitePlan = await prisma.membershipPlan.create({
    data: {
      name: "Elite",
      description: "Everything in Pro + personal trainer + nutrition plan + sauna.",
      price: 4999,
      duration: 30,
    },
  });

  const annualPlan = await prisma.membershipPlan.create({
    data: {
      name: "Annual Premium",
      description: "Full year of Elite membership at a discounted rate. Best value!",
      price: 39999,
      duration: 365,
    },
  });

  console.log("✅ Created 4 membership plans");

  // ─── Create Memberships ───
  const now = new Date();

  await prisma.membership.create({
    data: {
      userId: member1.id,
      planId: proPlan.id,
      startDate: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      endDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
      isActive: true,
    },
  });

  await prisma.membership.create({
    data: {
      userId: member2.id,
      planId: elitePlan.id,
      startDate: new Date(now.getFullYear(), now.getMonth(), 1),
      endDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
      isActive: true,
    },
  });

  await prisma.membership.create({
    data: {
      userId: member3.id,
      planId: basicPlan.id,
      startDate: new Date(now.getFullYear(), now.getMonth() - 2, 15),
      endDate: new Date(now.getFullYear(), now.getMonth() - 1, 15),
      isActive: false,
    },
  });

  await prisma.membership.create({
    data: {
      userId: member4.id,
      planId: annualPlan.id,
      startDate: new Date(now.getFullYear(), 0, 1),
      endDate: new Date(now.getFullYear() + 1, 0, 1),
      isActive: true,
    },
  });

  await prisma.membership.create({
    data: {
      userId: member5.id,
      planId: proPlan.id,
      startDate: new Date(now.getFullYear(), now.getMonth(), 5),
      endDate: new Date(now.getFullYear(), now.getMonth() + 1, 5),
      isActive: true,
    },
  });

  console.log("✅ Created 5 memberships (4 active, 1 expired)");

  // ─── Create Gym Classes ───
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const class1 = await prisma.gymClass.create({
    data: {
      name: "Morning HIIT Blast",
      description: "High-intensity 45-minute session to kickstart your day!",
      trainerId: trainer1.id,
      capacity: 20,
      startTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 6, 0),
      endTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 6, 45),
    },
  });

  const class2 = await prisma.gymClass.create({
    data: {
      name: "Power Yoga",
      description: "Strength-building yoga flow for flexibility and balance.",
      trainerId: trainer2.id,
      capacity: 15,
      startTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8, 0),
      endTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0),
    },
  });

  const class3 = await prisma.gymClass.create({
    data: {
      name: "CrossFit WOD",
      description: "Workout of the Day — varied functional movements at high intensity.",
      trainerId: trainer1.id,
      capacity: 12,
      startTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 17, 0),
      endTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 18, 0),
    },
  });

  const class4 = await prisma.gymClass.create({
    data: {
      name: "Zumba Dance Fitness",
      description: "Fun Latin-inspired dance workout for all fitness levels.",
      trainerId: trainer2.id,
      capacity: 25,
      startTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 19, 0),
      endTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 20, 0),
    },
  });

  console.log("✅ Created 4 gym classes");

  // ─── Create Class Bookings ───
  await prisma.classBooking.createMany({
    data: [
      { userId: member1.id, classId: class1.id },
      { userId: member2.id, classId: class1.id },
      { userId: member2.id, classId: class2.id },
      { userId: member3.id, classId: class3.id },
      { userId: member4.id, classId: class4.id },
      { userId: member5.id, classId: class1.id },
      { userId: member4.id, classId: class2.id },
    ],
  });

  console.log("✅ Created 7 class bookings\n");

  console.log("─────────────────────────────────");
  console.log("🎉 Database seeded successfully!");
  console.log("─────────────────────────────────");
  console.log("\n📊 Summary:");
  console.log("   👤 Users:            8");
  console.log("   📋 Membership Plans: 4");
  console.log("   🎫 Memberships:      5");
  console.log("   🏋️ Gym Classes:      4");
  console.log("   📅 Class Bookings:   7");
  console.log("\n🔍 Open Prisma Studio to view: npx prisma studio");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
