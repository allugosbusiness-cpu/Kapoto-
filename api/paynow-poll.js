// Vercel Serverless Function: Proxy for Paynow Poll URL
// Paynow's poll endpoints are also CORS-restricted, so we proxy through here

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let pollUrl;

    if (req.method === "GET") {
      pollUrl = req.query.url;
    } else if (req.method === "POST") {
      pollUrl = req.body.url;
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }

    if (!pollUrl) {
      return res.status(400).json({ error: "Missing 'url' parameter" });
    }

    // Decode URL if it was encoded
    const decodedUrl = decodeURIComponent(pollUrl);

    console.log("🔍 Polling Paynow at:", decodedUrl);

    const response = await fetch(decodedUrl);
    const responseText = await response.text();

    const parsed = parsePaynowResponse(responseText);

    console.log("📥 Poll response:", parsed);

    return res.status(200).json({
      success: true,
      status: parsed.status || "unknown",
      paid: parsed.status === "paid",
      reference: parsed.reference || "",
      paynowreference: parsed.paynowreference || "",
      amount: parsed.amount || "0",
      raw: parsed,
    });

  } catch (error) {
    console.error("❌ Poll proxy error:", error);
    return res.status(500).json({
      error: "Failed to poll Paynow status: " + error.message,
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