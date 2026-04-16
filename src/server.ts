import "./bootstrap"; // 👈 MUST be first line
import "./services/whatsapp"
import { latestQr } from "./services/whatsapp";

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { pool } from "./config/db";

const PORT = Number(process.env.PORT) || 5001;
app.get("/db", async (req, res) => {
  console.log("POSTGRESQL  ENDPOINT")
  const result = await pool.query("SELECT NOW()");
  res.json({
    time: result.rows[0],
  });
});
app.post("/send", async (req, res) => {
  // const { number, message } = req.body;
  console.log("WHATSAPP  ENDPOINT")

  // await client.sendMessage(`${number}@c.us`, message);

  res.json({ success: true });
});


app.get("/qr", (req, res) => {
  if (!latestQr) {
    return res.send("sNo QR available or already authenticated.");
  }

  res.send(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:40px;">
        <h2>WhatsApp QR Code</h2>
        <img src="${latestQr}" />
      </body>
    </html>
  `);
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
// ostgresql://postgres:Docker_Tutorial%40%40%40%23%2E%2F@db.zzpyxbwjaqoaitlebbfg.supabase.co:5432/postgres