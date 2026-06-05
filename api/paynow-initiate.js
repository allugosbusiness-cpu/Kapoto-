// Vercel Serverless Function: Proxy for Paynow InitiateTransaction
// This runs on Vercel's server, NOT the browser - so no CORS issues
// Paynow only accepts server-to-server requests

export default async function handler(req, res) {
  // Handle CORS for our frontend
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
    const { 
      reference, 
      amount, 
      integrationId, 
      integrationKey,
      phone,
      email,
      orderType 
    } = req.body;

    if (!reference || !amount || !integrationId || !integrationKey) {
      return res.status(400).json({ 
        error: "Missing required fields: reference, amount, integrationId, integrationKey" 
      });
    }

    const paynowUrl = "https://www.paynow.co.zw/interface/initiatetransaction";

    // Build Paynow request parameters
    const paymentData = {
      result_url: `${req.headers.origin || "https://kapoto.vercel.app"}/api/paynow-result`,
      return_url: `${req.headers.origin || "https://kapoto.vercel.app"}/payment-success`,
      reference,
      amount: parseFloat(amount).toFixed(2),
      id: integrationId,
      additionalinfo: `Kapoto Order - ${orderType || "Customer"}`,
      authemail: email || "customer@kapoto.com",
      status: "message",
    };

    // Add phone for EcoCash push payments
    if (phone) {
      paymentData.phone = phone.replace(/\D/g, "");
    }

    console.log("📤 Sending to Paynow:", paymentData);

    const response = await fetch(paynowUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(paymentData),
    });

    const responseText = await response.text();
    console.log("📥 Paynow response:", responseText);

    const parsed = parsePaynowResponse(responseText);

    if (parsed.status !== "ok") {
      return res.status(400).json({
        error: parsed.error || "Paynow initiation failed",
        raw: responseText,
      });
    }

    return res.status(200).json({
      success: true,
      pollurl: parsed.pollurl,
      browserurl: parsed.browserurl,
      reference: parsed.reference || reference,
      paynowreference: parsed.paynowreference || "",
    });

  } catch (error) {
    console.error("❌ Paynow proxy error:", error);
    return res.status(500).json({
      error: "Failed to communicate with Paynow: " + error.message,
    });
  }
}

function parsePaynowResponse(responseText) {
  const result = {};
  const lines = responseText.split("\n");
  lines.forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      result[key.toLowerCase().trim()] = valueParts.join("=").trim();
    }
  });
  return result;
}