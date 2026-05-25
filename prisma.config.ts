import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // DATABASE_URL is loaded via dotenv above. When unset (early-stage dev),
  // Prisma generate still succeeds — only `prisma db push` / runtime needs it.
  datasource: { url: process.env.DATABASE_URL ?? "" },
});
