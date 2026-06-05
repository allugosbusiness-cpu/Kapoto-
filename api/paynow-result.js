// Vercel Serverless Function: Paynow result/webhook receiver
// Paynow POSTs the payment result here after customer completes payment
// We log it and can trigger WhatsApp notifications

export default async function handler(req, res) {
  // Handle both GET (from redirect) and POST (from Paynow server)
  if (req.method === "GET") {
    // User was redirected here after payment
    const status = req.query.status || "unknown";
    const reference = req.query.reference || "unknown";
    
    console.log("🔁 Payment redirect received:", { status, reference });
    
    // Redirect user to a friendly page
    return res.redirect(307, `/?payment=${status}&ref=${reference}`);
  }

  if (req.method === "POST") {
    // Paynow server-to-server notification
    console.log("📩 Paynow webhook received:", req.body);

    const reference = req.body.reference || "unknown";
    const status = req.body.status || "unknown";
    const paynowreference = req.body.paynowreference || "";
    const amount = req.body.amount || "0";

    // Log the payment result
    console.log(`💳 Payment ${status}`, {
      reference,
      paynowreference,
      amount,
      timestamp: new Date().toISOString(),
    });

    // If configured, notify via WhatsApp about the payment
    const webhookUrl = process.env.VITE_ORDER_WEBHOOK_URL;
    if (webhookUrl && status === "paid") {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "payment_received",
            reference,
            paynowreference,
            amount,
            status,
            timestamp: new Date().toISOString(),
          }),
        }).catch((err) => console.warn("Webhook notify failed:", err));
      } catch (e) {
        console.warn("Webhook error:", e);
      }
    }

    // Paynow expects "OK" response to acknowledge receipt
    return res.status(200).send("OK");
  }

  return res.status(405).json({ error: "Method not allowed" });
}