// Vercel Serverless Function: Proxy for Twilio WhatsApp API
// Sends WhatsApp messages without exposing Twilio credentials to the browser

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, from, body } = req.body;

    if (!to || !from || !body) {
      return res.status(400).json({ 
        error: "Missing required fields: to, from, body" 
      });
    }

    const accountSid = process.env.VITE_TWILIO_ACCOUNT_SID;
    const authToken = process.env.VITE_TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      return res.status(400).json({ 
        error: "Twilio not configured. Set VITE_TWILIO_ACCOUNT_SID and VITE_TWILIO_AUTH_TOKEN" 
      });
    }

    // Twilio API endpoint
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
    // Basic auth for Twilio
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: to,
        From: from,
        Body: body,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Twilio WhatsApp sent:", result.sid);
      return res.status(200).json({ success: true, sid: result.sid });
    } else {
      console.error("❌ Twilio error:", result);
      return res.status(400).json({ error: result.message || "Twilio request failed" });
    }

  } catch (error) {
    console.error("❌ Twilio proxy error:", error);
    return res.status(500).json({ error: "Failed to send WhatsApp: " + error.message });
  }
}