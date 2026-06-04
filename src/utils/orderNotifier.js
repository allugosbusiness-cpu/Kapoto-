// Order notification service - sends order details to the restaurant owner
// In production, this would connect to an email API, SMS gateway, or webhook

const OWNER_EMAIL = "restaurant@kapoto.co.zw"; // Change to your owner's email
const OWNER_PHONE = "+263777777777"; // Change to owner's phone

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
 * Format order details for notification
 */
function formatOrderForNotification(order, orderCode, transaction) {
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
 * Send order notification to the restaurant owner
 * Uses multiple channels for reliability
 */
export async function notifyOwnerOfOrder(order, orderCode, transaction) {
  const message = formatOrderForNotification(order, orderCode, transaction);

  console.log("📋 NEW ORDER NOTIFICATION");
  console.log(message);

  const notifications = [];

  // 1. Webhook notification (if configured)
  const webhookUrl = import.meta.env.VITE_ORDER_WEBHOOK_URL;
  if (webhookUrl) {
    notifications.push(
      fetch(webhookUrl, {
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
      }).catch((err) => console.warn("Webhook notification failed:", err))
    );
  }

  // 2. Email notification via mailto (opens default email client)
  // In production, use a service like SendGrid, Resend, or a backend API
  const emailSubject = encodeURIComponent(`🍽️ New Order ${orderCode} - Kapoto Restaurant`);
  const emailBody = encodeURIComponent(message);
  const mailtoLink = `mailto:${OWNER_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
  
  // We don't auto-open mailto to avoid spam, but log it
  console.log(`📧 Email would be sent to: ${OWNER_EMAIL}`);
  console.log(`📧 Mailto link: ${mailtoLink}`);

  // 3. SMS notification (if Twilio or similar is configured)
  const smsApiKey = import.meta.env.VITE_SMS_API_KEY;
  if (smsApiKey) {
    // Integrate with your SMS provider here
    // Example: Twilio, Africa's Talking, etc.
    console.log(`📱 SMS would be sent to: ${OWNER_PHONE}`);
  }

  // Wait for all notifications to complete
  await Promise.allSettled(notifications);

  return {
    ownerEmail: OWNER_EMAIL,
    ownerPhone: OWNER_PHONE,
    notificationSent: true,
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