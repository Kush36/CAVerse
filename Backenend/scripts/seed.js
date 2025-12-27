// scripts/seed.js
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Plan = require("../models/Plan");
const bcrypt = require("bcryptjs");

(async () => {
  await connectDB();

  // create admin
  const adminEmail = "admin@caverse.test";
  const existAdmin = await User.findOne({ email: adminEmail });
  if (!existAdmin) {
    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({ name: "Admin", email: adminEmail, password: hashed, role: "admin" });
    console.log("Admin created:", adminEmail, "password: admin123");
  } else {
    console.log("Admin exists:", adminEmail);
  }

  // plans
  await Plan.deleteMany({});
  await Plan.insertMany([
    {
      slug: "foundation-normal",
      title: "Foundation — Normal Plan",
      price: 3999,
      originalPrice: 4999,
      features: ["Chapter-wise tests", "2 full mocks", "ICAI evaluation"]
    },
    {
      slug: "intermediate-core",
      title: "Intermediate — Core Mastery",
      price: 6999,
      originalPrice: 8999,
      features: ["50-mark mocks", "4 full mocks", "Mentor clinics"]
    },
    {
      slug: "final-master",
      title: "Final — Master Ranker",
      price: 19999,
      originalPrice: 25999,
      features: ["10 full mocks", "1:1 mentor", "Answer-writing clinics"]
    }
  ]);
  console.log("Seeded plans.");

  process.exit(0);
})();
