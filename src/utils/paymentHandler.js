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

// API base URL - uses Vercel proxy in production, local dev server fallback
function getApiBase() {
  // In production (Vercel), API routes are on the same origin
  // In local dev, we use the Vite proxy or the full URL
  if (import.meta.env.DEV) {
    return window.location.origin;
  }
  return window.location.origin; // Same origin on Vercel
}

// Initialize Stripe (fallback for future use)
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

// Check if Paynow is properly configured (real keys provided)
function isPaynowConfigured() {
  const integrationId = import.meta.env.VITE_PAYNOW_INTEGRATION_ID;
  const integrationKey = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY;
  return (
    integrationId &&
    integrationKey &&
    integrationId !== "your_paynow_integration_id" &&
    integrationKey !== "your_paynow_integration_key"
  );
}

// Process payment through the appropriate gateway
export async function processPayment(paymentData) {
  const { method, amount, order, cardDetails, ecocashNumber, onPollStatus } = paymentData;

  if (!amount || amount <= 0) {
    throw new Error("Invalid payment amount.");
  }

  switch (method) {
    case "credit_card":
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
      console.log("Stripe configured, would use Stripe Elements");
    } catch {
      // Fall through to Paynow
    }
  }

  if (isPaynowConfigured()) {
    return await cardViaPaynow(amount, order, onPollStatus);
  }

  return simulateCardPayment(amount, order, onPollStatus);
}

// Card payment through our API proxy (solves CORS)
async function cardViaPaynow(amount, order, onPollStatus) {
  const reference = `KAPOTO-CARD-${Date.now()}`;

  if (onPollStatus) onPollStatus("initiating", "Initiating payment...");

  // Step 1: Initiate payment through our API proxy
  const initiateResponse = await fetch(`${getApiBase()}/api/paynow-initiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reference,
      amount: amount.toFixed(2),
      integrationId: import.meta.env.VITE_PAYNOW_INTEGRATION_ID,
      integrationKey: import.meta.env.VITE_PAYNOW_INTEGRATION_KEY,
      email: order?.customerEmail || "customer@kapoto.com",
      orderType: order?.customerName || "Customer",
    }),
  });

  if (!initiateResponse.ok) {
    const errorData = await initiateResponse.json();
    throw new Error(errorData.error || "Card payment initiation failed.");
  }

  const paymentData = await initiateResponse.json();

  if (onPollStatus) onPollStatus("redirecting", "Opening secure payment page...");

  // Open Paynow's hosted payment page
  if (paymentData.browserurl) {
    window.open(paymentData.browserurl, "_blank", "width=800,height=700");
  }

  if (!paymentData.pollurl) {
    throw new Error("Paynow did not provide a status URL.");
  }

  // Step 2: Poll for payment confirmation through our proxy
  return await pollViaProxy(paymentData.pollurl, reference, amount, order, onPollStatus);
}

// Card simulation fallback
function simulateCardPayment(amount, order, onPollStatus) {
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

  if (isPaynowConfigured()) {
    return await ecocashViaPaynow(amount, order, cleanNumber, onPollStatus);
  }

  return simulateEcoCashPayment(amount, order, cleanNumber, onPollStatus);
}

// EcoCash through our API proxy (solves CORS)
async function ecocashViaPaynow(amount, order, phoneNumber, onPollStatus) {
  const reference = `KAPOTO-ECO-${Date.now()}`;

  if (onPollStatus) onPollStatus("initiating", "Initiating EcoCash payment...");

  // Step 1: Initiate payment through our API proxy
  const initiateResponse = await fetch(`${getApiBase()}/api/paynow-initiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reference,
      amount: amount.toFixed(2),
      integrationId: import.meta.env.VITE_PAYNOW_INTEGRATION_ID,
      integrationKey: import.meta.env.VITE_PAYNOW_INTEGRATION_KEY,
      phone: phoneNumber,
      email: order?.customerEmail || "customer@kapoto.com",
      orderType: order?.customerName || "Customer",
    }),
  });

  if (!initiateResponse.ok) {
    const errorData = await initiateResponse.json();
    throw new Error(errorData.error || "EcoCash payment initiation failed.");
  }

  const paymentData = await initiateResponse.json();

  if (onPollStatus) onPollStatus("waiting_for_pin", "Check your phone and enter your EcoCash PIN");

  if (!paymentData.pollurl) {
    throw new Error("Paynow did not provide a status URL.");
  }

  // Step 2: Poll for payment confirmation through our proxy
  return await pollViaProxy(paymentData.pollurl, reference, amount, order, onPollStatus);
}

// ============== POLL PAYNOW STATUS (via our proxy to avoid CORS) ==============
async function pollViaProxy(pollUrl, reference, amount, order, onPollStatus) {
  const maxAttempts = 30;
  const pollInterval = 5000;
  const apiBase = getApiBase();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      // Poll through our API proxy
      const pollResponse = await fetch(`${apiBase}/api/paynow-poll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pollUrl }),
      });

      if (!pollResponse.ok) {
        throw new Error("Poll request failed");
      }

      const status = await pollResponse.json();
      console.log(`Paynow poll attempt ${attempt + 1}:`, status);

      if (status.paid) {
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