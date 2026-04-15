// import "./bootstrap"; // 👈 MUST be first line
import "../../src/bootstrap"

import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.DATABASE_URL;
console.log(`connectionString`+connectionString)
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});
pool.connect()

  .then(() => {
    console.log("✅ Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Failed to connect:", err);
  });
  // Docker_Tutorial@@@#./


  // postgresql://postgres:Docker_Tutorial%40%40%40%23%2E%2F@db.zzpyxbwjaqoaitlebbfg.supabase.co:5432/postgres

  