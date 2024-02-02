import { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// CONNECT THE DRIZZLE SCHEMA TO NEON DB
export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
