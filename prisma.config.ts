import { defineConfig } from "prisma/config";
import appConfig from "./src/config"; // your app config

export default defineConfig({
  // Singular datasource object
  datasource: {
    url: appConfig.database_url, // direct URL, no nesting
    // Optional: shadow database for migrations
    // shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts", // optional
  },
});
