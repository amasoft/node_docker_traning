import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import QRCode from "qrcode";
export let latestQr: string | null = null;

export const client = new Client({
  authStrategy: new LocalAuth({
    // dataPath: "/app/.wwebjs_auth" // IMPORTANT for Docker persistence
        dataPath: "/tmp/wwebjs_auth" // ✅ safe writable folder

  }),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

// client.on("qr", (qr) => {
//   console.log("Scan QR:");
//   qrcode.generate(qr, { small: true });
// });
// client.on("qr", (qr: string) => {
//   console.log("Scan this QR code:");
//   qrcode.generate(qr, { small: true });
//   latestQr = await QRCode.toDataURL(qr);
//   console.log("✅ QR generated. Visit /qr to view it.");
// });

client.on("qr", async (qr:string) => {
  latestQr = await QRCode.toDataURL(qr);
  console.log("✅ QR generated. Visit /qr to view it.  "+latestQr);
});
client.on("ready", () => {
  console.log("✅ WhatsApp ready");
    console.log(client.info);

});
client.on('disconnected', (reason:string) => {
  console.log('Disconnected:', reason);
});

client.on('authenticated', () => {
  console.log('Authenticated');
});

client.initialize();