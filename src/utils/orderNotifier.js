// Order notification service - sends order details to the restaurant owner
// Supports: WhatsApp (via CallMeBot or Twilio), Webhook, and Console logging

// OWNER CONTACT INFO - update these with the actual owner's details
const OWNER_NAME = "Allugos"; // Restaurant owner name
const OWNER_EMAIL = "restaurant@kapoto.co.zw";
const OWNER_WHATSAPP_NUMBER = "263777777777"; // Without + sign - THE OWNER'S NUMBER

/**
 * Generates a unique order code for customer reference
 * Format: KPT-XXXXXX (e.g., KPT-A7F3K2)
 */
export function generateOrderCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed confusing chars (0,O,1,I)
  let code = "KPT-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Short order summary for WhatsApp (fits in a single message)
 */
function formatWhatsAppMessage(order, orderCode, transaction) {
  const itemsList = order.items
    .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
    .join("\n");

  const orderType = order.orderType === "delivery" ? "🚗 Delivery" : "🏪 Pickup";
  const paymentEmoji = order.paymentMethod === "credit_card" ? "💳" : order.paymentMethod === "ecocash" ? "📱" : "🔵";

  return `🍽️ *NEW ORDER - KAPOTO*
━━━━━━━━━━━━━━━━━
🆔 Order Code: *${orderCode}*
💵 Total: *$${order.total?.toFixed(2)}*
📦 Type: ${orderType}
🏢 Branch: ${order.branch}
${order.orderType === "delivery" ? `📍 ${order.deliveryAddress?.street || ""}, ${order.deliveryAddress?.city || ""}` : ""}
👤 Customer: ${order.customerName || "N/A"}
📞 ${order.customerPhone || "N/A"}
${paymentEmoji} Paid via ${order.paymentMethod === "credit_card" ? "Card" : order.paymentMethod === "ecocash" ? "EcoCash" : "Google Pay"}
━━━━━━━━━━━━━━━━━
Items:
${itemsList}
━━━━━━━━━━━━━━━━━
⏰ ${new Date().toLocaleString()}
🔗 View: https://kapoto-restaurant.vercel.app/orders`;
}

/**
 * Full detailed order info (for email/logging)
 */
function formatFullOrderNotification(order, orderCode, transaction) {
  const itemsList = order.items
    .map((item) => `  • ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
    .join("\n");

  return `
═══════════════════════════════════════
  🍽️  NEW ORDER RECEIVED - KAPOTO
═══════════════════════════════════════

Order Code: ${orderCode}
Order ID: ${order.id}
Date: ${new Date().toLocaleString()}

─── Customer Details ───
Name: ${order.customerName || "N/A"}
Email: ${order.customerEmail || "N/A"}
Phone: ${order.customerPhone || "N/A"}

─── Order Type ───
${order.orderType === "delivery" ? "🚗 Delivery" : "🏪 Pickup"}
Branch: ${order.branch}

${order.orderType === "delivery" ? `
─── Delivery Address ───
Street: ${order.deliveryAddress?.street || "N/A"}
City: ${order.deliveryAddress?.city || "N/A"}
Phone: ${order.deliveryAddress?.phone || "N/A"}
` : ""}

─── Items Ordered ───
${itemsList}

─── Payment Summary ───
Subtotal:    $${order.subtotal?.toFixed(2)}
Delivery:    $${(order.deliveryFee || 0).toFixed(2)}
Discount:    $${(order.discount || 0).toFixed(2)}
TOTAL:       $${order.total?.toFixed(2)}

─── Payment Info ───
Method: ${order.paymentMethod === "credit_card" ? "💳 Credit/Debit Card" : order.paymentMethod === "ecocash" ? "📱 EcoCash" : "🔵 Google Pay"}
Status: ✅ PAID
Transaction: ${transaction?.id || "N/A"}
Reference: ${transaction?.reference || "N/A"}
${transaction?.cardLast4 ? `Card ending: ****${transaction.cardLast4}` : ""}

─── Loyalty ───
Points earned: ${Math.floor(order.total)} pts

═══════════════════════════════════════
`;
}

/**
 * Send WhatsApp message via CallMeBot (FREE - no API key required)
 * CallMeBot is a free WhatsApp API that works worldwide
 * 
 * HOW TO SETUP:
 * 1. Send "I allow callmebot to send me messages" to +34 644 51 95 80 on WhatsApp
 * 2. You'll receive your API key
 * 3. Set VITE_CALLMEBOT_API_KEY in .env
 * 4. That's it! It sends WhatsApp messages for free
 * 
 * Limitations: ~1,000 free messages/month, plain text only
 */
async function sendViaCallMeBot(phoneNumber, message, apiKey) {
  if (!apiKey) return false;

  try {
    // CallMeBot accepts GET requests, max 1024 chars for free tier
    const shortMessage = message.substring(0, 1000);
    const encodedMessage = encodeURIComponent(shortMessage);
    const encodedPhone = encodeURIComponent(phoneNumber);
    
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodedPhone}&text=${encodedMessage}&apikey=${apiKey}`;
    
    const response = await fetch(url);
    const text = await response.text();
    
    if (response.ok) {
      console.log("✅ WhatsApp sent via CallMeBot to", phoneNumber);
      return true;
    } else {
      console.warn("⚠️ CallMeBot WhatsApp failed:", text);
      return false;
    }
  } catch (error) {
    console.warn("⚠️ CallMeBot WhatsApp error:", error.message);
    return false;
  }
}

/**
 * Send WhatsApp message via Twilio API
 * More reliable but requires a paid Twilio account
 * 
 * HOW TO SETUP:
 * 1. Create Twilio account (free trial available)
 * 2. Get your Account SID, Auth Token, and WhatsApp sender number
 * 3. Set VITE_TWILIO_ACCOUNT_SID, VITE_TWILIO_AUTH_TOKEN, VITE_TWILIO_WHATSAPP_FROM
 * 
 * NOTE: This sends from the browser via our API proxy
 */
async function sendViaTwilio(phoneNumber, message) {
  const twilioSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
  const twilioToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
  const twilioFrom = import.meta.env.VITE_TWILIO_WHATSAPP_FROM;

  if (!twilioSid || !twilioToken || !twilioFrom) return false;

  try {
    // We send through our API proxy to avoid exposing Twilio credentials
    const shortMessage = message.substring(0, 1600);
    
    const response = await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: `whatsapp:${phoneNumber}`,
        from: twilioFrom,
        body: shortMessage,
      }),
    });

    if (response.ok) {
      console.log("✅ WhatsApp sent via Twilio to", phoneNumber);
      return true;
    } else {
      const error = await response.text();
      console.warn("⚠️ Twilio WhatsApp failed:", error);
      return false;
    }
  } catch (error) {
    console.warn("⚠️ Twilio WhatsApp error:", error.message);
    return false;
  }
}

/**
 * Send order notification to the restaurant owner
 * Uses multiple channels for reliability (WhatsApp, Webhook, Email)
 */
export async function notifyOwnerOfOrder(order, orderCode, transaction) {
  const fullMessage = formatFullOrderNotification(order, orderCode, transaction);
  const whatsappMessage = formatWhatsAppMessage(order, orderCode, transaction);

  console.log("📋 NEW ORDER NOTIFICATION");
  console.log(fullMessage);

  const results = {
    whatsapp: false,
    webhook: false,
    email: false,
  };

  // ========================================
  // 1. WHATSAPP (PRIMARY) - Send to owner
  // ========================================
  // Try multiple WhatsApp providers in order of preference
  
  // 1a. CallMeBot (Free, no setup required)
  const callMeBotApiKey = import.meta.env.VITE_CALLMEBOT_API_KEY;
  const ownerNumber = import.meta.env.VITE_OWNER_WHATSAPP || OWNER_WHATSAPP_NUMBER;
  
  if (callMeBotApiKey) {
    results.whatsapp = await sendViaCallMeBot(ownerNumber, whatsappMessage, callMeBotApiKey);
  }

  // 1b. Twilio (Paid, more reliable)
  if (!results.whatsapp) {
    results.whatsapp = await sendViaTwilio(ownerNumber, whatsappMessage);
  }

  if (results.whatsapp) {
    console.log(`📱 WhatsApp notification sent to ${ownerNumber}`);
  } else {
    console.log("⚠️ WhatsApp not configured. Set VITE_CALLMEBOT_API_KEY in .env");
  }

  // ========================================
  // 2. WEBHOOK
  // ========================================
  const webhookUrl = import.meta.env.VITE_ORDER_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCode,
          orderId: order.id,
          customer: {
            name: order.customerName,
            email: order.customerEmail,
            phone: order.customerPhone,
          },
          orderType: order.orderType,
          branch: order.branch,
          deliveryAddress: order.deliveryAddress,
          items: order.items,
          subtotal: order.subtotal,
          deliveryFee: order.deliveryFee,
          discount: order.discount,
          total: order.total,
          payment: {
            method: order.paymentMethod,
            transactionId: transaction?.id,
            reference: transaction?.reference,
          },
          timestamp: new Date().toISOString(),
        }),
      });
      results.webhook = true;
      console.log("✅ Webhook notification sent");
    } catch (err) {
      console.warn("⚠️ Webhook notification failed:", err);
    }
  }

  // ========================================
  // 3. EMAIL (via mailto fallback)
  // ========================================
  const emailSubject = encodeURIComponent(`🍽️ New Order ${orderCode} - Kapoto Restaurant`);
  const emailBody = encodeURIComponent(fullMessage);
  const mailtoLink = `mailto:${OWNER_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  console.log(`📧 Email would be sent to: ${OWNER_EMAIL}`);
  console.log(`📧 Mailto link: ${mailtoLink}`);
  results.email = true; // mailto is always "available"

  return {
    ownerName: OWNER_NAME,
    ownerEmail: OWNER_EMAIL,
    ownerWhatsApp: ownerNumber,
    notificationChannels: results,
    notificationSent: results.whatsapp || results.webhook,
  };
}

/**
 * Generate a printable receipt for the customer
 */
export function generateOrderReceipt(order, orderCode, transaction) {
  const items = order.items
    .map((item) => `${item.name} x${item.quantity}`)
    .join(", ");

  return {
    orderCode,
    orderId: order.id,
    date: new Date().toLocaleString(),
    customerName: order.customerName,
    items,
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee || 0,
    discount: order.discount || 0,
    total: order.total,
    paymentMethod: order.paymentMethod,
    transactionId: transaction?.id,
    reference: transaction?.reference,
    branch: order.branch,
    deliveryAddress: order.deliveryAddress,
  };
}