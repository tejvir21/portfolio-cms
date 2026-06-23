import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "PORT",
  "MONGODB_URI",

  "JWT_SECRET",
  "JWT_EXPIRES_IN",

  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_BUCKET_NAME",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
  supabaseUrl: process.env.SUPABASE_URL as string,

  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY as string,

  supabaseBucketName: process.env.SUPABASE_BUCKET_NAME as string,
};
