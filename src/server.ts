import "./bootstrap"; // 👈 MUST be first line


import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { pool } from "./config/db";

const PORT = Number(process.env.PORT) || 5000;
app.get("/db", async (req, res) => {
  console.log("POSTGRESQL  ENDPOINT")
  const result = await pool.query("SELECT NOW()");
  res.json({
    time: result.rows[0],
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});