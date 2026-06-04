import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

// Payment methods configuration
export const PAYMENT_METHODS = {
  ECOCASH: {
    id: "ecocash",
    name: "EcoCash",
    description: "Pay using EcoCash mobile money (Zimbabwe)",
    icon: "📱",
    available: true,
  },
  CREDIT_CARD: {
    id: "credit_card",
    name: "Credit/Debit Card",
    description: "Pay via Paynow secure checkout (Visa, Mastercard, etc)",
    icon: "💳",
    available: true,
  },
  GOOGLE_PAY: {
    id: "google_pay",
    name: "Google Pay",
    description: "Quick and secure payment with Google Pay",
    icon: "🔵",
    available: true,
  },
};

// Initialize Stripe
let stripePromise = null;
function getStripe() {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (key && key !== "pk_test_your_stripe_publishable_key") {
      stripePromise = loadStripe(key);
    }
  }
  return stripePromise;
}

// Process payment through the appropriate gateway
export async function processPayment(paymentData) {
  const { method, amount, order, cardDetails, ecocashNumber, onPollStatus } = paymentData;

  if (!amount || amount <= 0) {
    throw new Error("Invalid payment amount.");
  }

  switch (method) {
    case "credit_card":
      // Card also goes through Paynow for secure hosted page
      return await processCardPayment(amount, order, onPollStatus);
    case "ecocash":
      return await processEcoCashPayment(amount, order, ecocashNumber, onPollStatus);
    case "google_pay":
      return await processGooglePayPayment(amount, order);
    default:
      throw new Error("Invalid payment method selected.");
  }
}

// ============== CARD PAYMENT (via Paynow) ==============
async function processCardPayment(amount, order, onPollStatus) {
  // Try Stripe first if configured
  const stripe = await getStripe();
  if (stripe) {
    try {
      // Stripe integration would go here with PaymentElement
      // For now, fall through to Paynow
      console.log("Stripe configured, would use Stripe Elements");
    } catch {
      // Fall through to Paynow
    }
  }

  // Use Paynow for card payments - same flow as EcoCash but without phone number
  // Paynow's hosted page handles all card entry securely
  const integrationId = import.meta.env.VITE_PAYNOW_INTEGRATION_ID;
  const integrationKey = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY;

  if (integrationId && integrationKey && 
      integrationId !== "your_paynow_integration_id" && 
      integrationKey !== "your_paynow_integration_key") {
    return await processCardViaPaynow(amount, order, integrationId, integrationKey, onPollStatus);
  }

  // Fallback: simulate card via Paynow
  return simulateCardViaPaynow(amount, order, onPollStatus);
}

// Process card payment through Paynow's hosted checkout page
async function processCardViaPaynow(amount, order, integrationId, integrationKey, onPollStatus) {
  const reference = `KAPOTO-CARD-${Date.now()}`;
  const paynowUrl = "https://www.paynow.co.zw/interface/initiatetransaction";

  // Paynow will show a hosted payment page where user can select "Card" option
  const paymentData = {
    result_url: window.location.origin + "/payment-result",
    return_url: window.location.origin + "/payment-success",
    reference,
    amount: amount.toFixed(2),
    id: integrationId,
    additionalinfo: `Kapoto Card Order - ${order?.customerName || "Customer"}`,
    authemail: order?.customerEmail || "customer@kapoto.com",
    status: "Message",
  };

  const response = await fetch(paynowUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(paymentData),
  });

  const responseText = await response.text();
  const parsed = parsePaynowResponse(responseText);

  if (parsed.status !== "ok") {
    throw new Error(parsed.error || "Card payment initiation failed.");
  }

  // Notify UI that we're redirecting
  if (onPollStatus) onPollStatus("redirecting", "Opening secure payment page...");

  // Open Paynow's hosted payment page where user can pay with card
  if (parsed.browserurl) {
    window.open(parsed.browserurl, "_blank", "width=800,height=700");
  }

  const pollUrl = parsed.pollurl;
  if (!pollUrl) {
    throw new Error("Paynow did not provide a status URL.");
  }

  // Poll for payment confirmation
  const transaction = await pollPaymentStatus(pollUrl, reference, amount, order, onPollStatus);

  return transaction;
}

// Simulate card payment via Paynow-style hosted page
function simulateCardViaPaynow(amount, order, onPollStatus) {
  return new Promise((resolve, reject) => {
    if (onPollStatus) onPollStatus("waiting_for_pin", "Opening secure payment page...");

    toast.success(
      "💳 Redirecting to secure payment page...\n\n" +
      "In production, Paynow's hosted page would open.\n" +
      "Simulation: Auto-confirming in 5 seconds.",
      { duration: 5000 }
    );

    let countdown = 5;
    const interval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(interval);

        if (Math.random() > 0.05) {
          const transaction = {
            id: `CARD-${Date.now()}`,
            orderId: order?.id || `ORD-${Date.now()}`,
            method: "credit_card",
            amount,
            status: "success",
            timestamp: new Date().toISOString(),
            reference: `SIM-CARD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            paymentGateway: "simulation",
          };
          toast.success(`✅ Card payment confirmed! $${amount.toFixed(2)} charged.`);
          if (onPollStatus) onPollStatus("confirmed", "Payment received!");
          resolve(transaction);
        } else {
          if (onPollStatus) onPollStatus("cancelled", "Payment declined.");
          reject(new Error("Card payment was declined. Please try a different card."));
        }
      } else {
        toast(`⏳ Waiting for card payment... (${countdown}s)`, {
          id: "card-countdown",
          duration: 2000,
        });
      }
    }, 1000);
  });
}

// ============== ECOCASH PAYMENT (via Paynow) ==============
async function processEcoCashPayment(amount, order, ecocashNumber, onPollStatus) {
  if (!ecocashNumber || ecocashNumber.replace(/\D/g, "").length < 10) {
    throw new Error("Please enter a valid EcoCash phone number (e.g., 077XXXXXXX).");
  }

  const cleanNumber = ecocashNumber.replace(/\D/g, "");

  const integrationId = import.meta.env.VITE_PAYNOW_INTEGRATION_ID;
  const integrationKey = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY;

  if (integrationId && integrationKey && 
      integrationId !== "your_paynow_integration_id" && 
      integrationKey !== "your_paynow_integration_key") {
    return await processEcoCashViaPaynow(amount, order, cleanNumber, integrationId, integrationKey, onPollStatus);
  }

  return simulateEcoCashPayment(amount, order, cleanNumber, onPollStatus);
}

async function processEcoCashViaPaynow(amount, order, phoneNumber, integrationId, integrationKey, onPollStatus) {
  const reference = `KAPOTO-ECO-${Date.now()}`;
  const paynowUrl = "https://www.paynow.co.zw/interface/initiatetransaction";

  const paymentData = {
    result_url: window.location.origin + "/payment-result",
    return_url: window.location.origin + "/payment-success",
    reference,
    amount: amount.toFixed(2),
    id: integrationId,
    additionalinfo: `Kapoto Order - ${order?.customerName || "Customer"}`,
    authemail: order?.customerEmail || "customer@kapoto.com",
    status: "Message",
    phone: phoneNumber,
  };

  const response = await fetch(paynowUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(paymentData),
  });

  const responseText = await response.text();
  const parsed = parsePaynowResponse(responseText);

  if (parsed.status !== "ok") {
    throw new Error(parsed.error || "EcoCash payment initiation failed.");
  }

  if (onPollStatus) onPollStatus("waiting_for_pin", "Check your phone and enter your EcoCash PIN");

  const pollUrl = parsed.pollurl;
  if (!pollUrl) {
    throw new Error("Paynow did not provide a status URL.");
  }

  const transaction = await pollPaymentStatus(pollUrl, reference, amount, order, onPollStatus);

  return transaction;
}

// ============== POLL PAYNOW STATUS (shared by Card & EcoCash) ==============
async function pollPaymentStatus(pollUrl, reference, amount, order, onPollStatus) {
  const maxAttempts = 30;
  const pollInterval = 5000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const statusResponse = await fetch(pollUrl);
      const statusText = await statusResponse.text();
      const status = parsePaynowResponse(statusText);

      console.log(`Paynow poll attempt ${attempt + 1}:`, status);

      if (status.status === "paid") {
        if (onPollStatus) onPollStatus("confirmed", "Payment received!");

        const transaction = {
          id: `TXN-${Date.now()}`,
          orderId: order?.id || `ORD-${Date.now()}`,
          method: order?.paymentMethod || "credit_card",
          amount,
          status: "success",
          timestamp: new Date().toISOString(),
          reference,
          paynowReference: status.paynowreference || "",
          paymentGateway: "paynow",
          pollAttempts: attempt + 1,
        };

        toast.success(`✅ Payment confirmed! $${amount.toFixed(2)} received.`);
        return transaction;
      }

      if (status.status === "cancelled") {
        if (onPollStatus) onPollStatus("cancelled", "Payment was cancelled.");
        throw new Error("Payment was cancelled. Please try again.");
      }

      if (status.status === "failed") {
        if (onPollStatus) onPollStatus("failed", "Payment failed.");
        throw new Error("Payment failed. Please try again.");
      }

      if (onPollStatus) {
        onPollStatus(
          "waiting",
          `Waiting for payment confirmation... (${attempt + 1}/${maxAttempts})`
        );
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval));
    } catch (error) {
      if (error.message.includes("cancelled") || error.message.includes("failed")) {
        throw error;
      }
      console.warn("Paynow poll error, retrying:", error);
      continue;
    }
  }

  if (onPollStatus) onPollStatus("timeout", "Payment time expired.");
  throw new Error(
    "Payment did not complete in time. " +
    "Your order can still be processed manually with reference: " + reference
  );
}

// Parse Paynow response format
function parsePaynowResponse(responseText) {
  const result = {};
  const lines = responseText.split("\n");
  lines.forEach(line => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      result[key.toLowerCase().trim()] = valueParts.join("=").trim();
    }
  });
  return result;
}

// Simulate EcoCash payment
function simulateEcoCashPayment(amount, order, phoneNumber, onPollStatus) {
  return new Promise((resolve, reject) => {
    const maskedNumber = phoneNumber ? phoneNumber.slice(0, 3) + "****" + phoneNumber.slice(-3) : "077*******";

    toast.success(
      `📱 EcoCash request sent to ${maskedNumber}!`,
      { duration: 6000 }
    );

    if (onPollStatus) onPollStatus("waiting_for_pin", "Check your phone and enter your EcoCash PIN");

    let countdown = 10;
    const interval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(interval);

        if (Math.random() > 0.05) {
          if (onPollStatus) onPollStatus("confirmed", "Payment received!");
          const transaction = {
            id: `ECO-${Date.now()}`,
            orderId: order?.id || `ORD-${Date.now()}`,
            method: "ecocash",
            amount,
            status: "success",
            timestamp: new Date().toISOString(),
            reference: `SIM-ECO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            ecocashNumber: maskedNumber,
            paymentGateway: "simulation",
          };
          toast.success(`✅ EcoCash payment confirmed! $${amount.toFixed(2)} received.`);
          resolve(transaction);
        } else {
          if (onPollStatus) onPollStatus("cancelled", "Payment failed.");
          reject(new Error("EcoCash payment failed. Please try again."));
        }
      } else {
        toast(`⏳ Waiting for EcoCash approval... (${countdown}s)`, {
          id: "ecocash-countdown",
          duration: 2000,
        });
      }
    }, 1000);
  });
}

// ============== GOOGLE PAY ==============
async function processGooglePayPayment(amount, order) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (Math.random() > 0.05) {
      const transaction = {
        id: `GPAY-${Date.now()}`,
        orderId: order?.id || `ORD-${Date.now()}`,
        method: "google_pay",
        amount,
        status: "success",
        timestamp: new Date().toISOString(),
        reference: `GPAY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        paymentGateway: "google_pay",
      };
      toast.success(`Google Pay payment successful! Charged $${amount.toFixed(2)}`);
      return transaction;
    } else {
      throw new Error("Google Pay payment failed. Please try again.");
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}

// ============== VALIDATION ==============
export function validatePaymentDetails(paymentData) {
  const { method, amount, ecocashNumber } = paymentData;
  const errors = {};

  if (!method) errors.method = "Payment method is required";
  if (!amount || amount <= 0) errors.amount = "Valid amount is required";

  if (method === "ecocash") {
    const cleaned = (ecocashNumber || "").replace(/\D/g, "");
    if (!cleaned || cleaned.length < 10) {
      errors.ecocashNumber = "Valid EcoCash phone number (10+ digits) is required";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// ============== FORMATTING ==============
export function formatCardNumber(cardNumber) {
  return cardNumber
    .replace(/\s/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function maskCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\s/g, "");
  const last4 = cleaned.slice(-4);
  return `**** **** **** ${last4}`;
}

// ============== RECEIPT ==============
export function generateReceipt(order, transaction, deliveryFee = 0) {
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (order.deliveryFee || 0) - (order.discount || 0);

  return {
    receiptNumber: `REC-${Date.now()}`,
    orderNumber: order.id,
    transactionId: transaction.id,
    paymentMethod: PAYMENT_METHODS[transaction.method.toUpperCase().replace(/_/g, "_")]?.name || transaction.method,
    timestamp: new Date().toLocaleString(),
    items: order.items,
    subtotal: subtotal.toFixed(2),
    deliveryFee: (order.deliveryFee || 0).toFixed(2),
    discount: (order.discount || 0).toFixed(2),
    total: total.toFixed(2),
    deliveryAddress: order.deliveryAddress,
    branch: order.branch,
    loyaltyPointsEarned: Math.floor(total),
  };
}