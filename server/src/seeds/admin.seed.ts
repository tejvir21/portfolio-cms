import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import Admin from "../models/Admin";

import { env } from "../config/env";

const seedAdmin = async () => {
  try {
    await mongoose.connect(env.mongoUri);

    const exists = await Admin.findOne({
      email: "admin@portfolio.com",
    });

    if (exists) {
      console.log("Admin already exists");

      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Tejvir@2109Portfolio", 10);

    await Admin.create({
      email: "admin@portfolio.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedAdmin();
