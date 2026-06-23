// import mongoose from "mongoose";
// import { env } from "./env";

// export const connectDB = async (): Promise<void> => {
//   try {
//     const connection = await mongoose.connect(env.mongoUri);

//     console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed");
//     console.error(error);

//     process.exit(1);
//   }
// };

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};
