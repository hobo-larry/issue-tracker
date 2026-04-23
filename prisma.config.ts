// prisma.config.ts  (at project root)
import "dotenv/config";                    // This loads your .env file
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations", // default location
  },

  datasource: {
    // For CLI commands (migrations, generate, studio, etc.)
    url: env("DATABASE_URL"), // Use your pooled URL here (e.g. Supabase, Neon, Railway)
    //directUrl: env("DIRECT_URL"),
  },
});