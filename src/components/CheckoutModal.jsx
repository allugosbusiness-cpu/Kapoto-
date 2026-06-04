import { useState } from "react";
import { X, MapPin, CreditCard, Copy, Check, Loader2, Phone, Clock } from "lucide-react";
import { useAuth } from "../AuthContext";
import { useOrders } from "../OrdersContext";
import { useCart } from "../CartContent";
import { useLoyalty } from "../LoyaltyContext";
import { calculateDistance, calculateDeliveryFee, getUserCoordinates, validateAddress } from "../utils/distanceCalculator";
import { processPayment, PAYMENT_METHODS, validatePaymentDetails } from "../utils/paymentHandler";
import { generateOrderCode, notifyOwnerOfOrder, generateOrderReceipt } from "../utils/orderNotifier";
import { toast } from "react-hot-toast";

export default function CheckoutModal({ isOpen, setIsOpen, cartItems, cartTotal }) {
  const { isAuthenticated, user } = useAuth();
  const { createOrder, branches, setBranch } = useOrders();
  const { clearCart } = useCart();
  const { addPoints } = useLoyalty();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [orderType, setOrderType] = useState("delivery");
  const [chosenBranch, setChosenBranch] = useState(branches[0]);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    phone: user?.phone || "",
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("ecocash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [copied, setCopied] = useState(false);

  // EcoCash specific state
  const [ecocashNumber, setEcocashNumber] = useState("");
  const [ecocashStatus, setEcocashStatus] = useState(null); // null | "waiting_for_pin" | "confirmed" | "cancelled" | "timeout"
  const [ecocashStatusMessage, setEcocashStatusMessage] = useState("");

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculateDelivery = async () => {
    const validation = validateAddress(deliveryAddress);
    if (!validation.isValid) {
      toast.error("Please fill in all address fields");
      return;
    }

    try {
      setLoading(true);
      const userCoords = await getUserCoordinates(deliveryAddress.city);
      
      if (!userCoords) {
        toast.error("Could not determine your location. Please enter a valid city in Zimbabwe.");
        setLoading(false);
        return;
      }
      
      const branchCoords = chosenBranch.coordinates;
      const distance = calculateDistance(
        userCoords.lat,
        userCoords.lng,
        branchCoords.lat,
        branchCoords.lng
      );
      const fee = calculateDeliveryFee(distance);
      setDeliveryFee(fee);
      toast.success(`Delivery fee: $${fee.toFixed(2)} for ${distance.toFixed(1)}km`);
    } catch (error) {
      toast.error("Failed to calculate delivery fee");
    } finally {
      setLoading(false);
    }
  };

  // Callback for EcoCash polling status updates
  const handleEcoCashPollStatus = (status, message) => {
    setEcocashStatus(status);
    setEcocashStatusMessage(message);

    if (status === "confirmed") {
      // Payment confirmed - proceed with order completion
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEcocashStatus(null);
    setEcocashStatusMessage("");

    try {
      // Step 1: Validate inputs based on payment method
      if (paymentMethod === "ecocash") {
        const validation = validatePaymentDetails({
          method: paymentMethod,
          amount: total,
          ecocashNumber,
        });
        if (!validation.isValid) {
          toast.error(validation.errors.ecocashNumber || "Please enter a valid EcoCash phone number");
          setLoading(false);
          return;
        }
      }

      // Step 2: Build the order object
      const order = {
        items: cartItems,
        orderType,
        branch: chosenBranch.name,
        deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
        deliveryFee: orderType === "delivery" ? deliveryFee : 0,
        subtotal: cartTotal,
        discount: 0,
        total,
        paymentMethod,
        status: "processing",
        customerName: user?.name || "Guest",
        customerEmail: user?.email || "guest@kapoto.com",
        customerPhone: user?.phone || deliveryAddress.phone || "",
      };

      // Step 3: Process payment through the gateway
      // Both Card and EcoCash go through Paynow - sends push/redirect, polls for confirmation
      const transaction = await processPayment({
        method: paymentMethod,
        amount: total,
        order,
        ecocashNumber: paymentMethod === "ecocash" ? ecocashNumber : null,
        onPollStatus: handleEcoCashPollStatus, // Always pass - works for Card & EcoCash
      });

      // If we get here, payment was SUCCESSFULLY VERIFIED by the gateway

      // Step 4: Generate unique order code
      const code = generateOrderCode();
      setOrderCode(code);

      // Step 5: Save order with payment confirmation
      createOrder(cartItems, {
        ...order,
        paymentTransaction: transaction.id,
        transactionReference: transaction.reference,
        orderCode: code,
        status: "confirmed",
        paidAt: new Date().toISOString(),
      });

      // Step 6: Add loyalty points
      addPoints(total);

      // Step 7: Notify restaurant owner
      await notifyOwnerOfOrder(order, code, transaction);

      // Step 8: Generate receipt
      const receipt = generateOrderReceipt(order, code, transaction);
      setOrderReceipt(receipt);

      // Step 9: Clear cart and show success
      clearCart();
      setOrderComplete(true);
      
      console.log("✅ ORDER CONFIRMED", {
        orderCode: code,
        transactionId: transaction.id,
        reference: transaction.reference,
        amount: total,
        method: paymentMethod,
        customer: user?.email,
        items: cartItems.length,
      });

    } catch (error) {
      toast.error(error.message || "Payment failed. Please try again.");
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (orderCode) {
      navigator.clipboard.writeText(orderCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Order code copied!");
    }
  };

  const handleCloseAfterOrder = () => {
    setIsOpen(false);
    setOrderComplete(false);
    setCurrentStep(1);
    setOrderCode("");
    setOrderReceipt(null);
    setDeliveryFee(0);
    setEcocashNumber("");
    setEcocashStatus(null);
    setEcocashStatusMessage("");
    setCardDetails({ cardNumber: "", expiryDate: "", cvv: "" });
  };

  if (!isOpen) return null;

  const total = cartTotal + (orderType === "delivery" ? deliveryFee : 0);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !orderComplete && setIsOpen(false)} />
      
      <div className="relative bg-gradient-to-b from-amber-900 to-amber-950 border border-amber-700/30 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl animate-in slide-in-from-bottom duration-300 my-8">
        {!orderComplete ? (
          <>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-amber-800/50 rounded-full transition-all"
            >
              <X className="w-5 h-5 text-amber-50" />
            </button>

            <h2 className="text-2xl font-bold text-amber-50 mb-6" style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 800,
            }}>
              Checkout
            </h2>

            {/* Progress steps */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map(step => (
                <div key={step} className={`h-2 flex-1 rounded-full transition-all ${step <= currentStep ? "bg-amber-500" : "bg-amber-800/30"}`} />
              ))}
            </div>

            {/* STEP 1: Delivery Options */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-amber-50 font-semibold">Order Type:</label>
                    {["pickup", "delivery"].map(type => (
                      <label key={type} className="flex items-center gap-3 p-3 border border-amber-700/30 rounded-lg hover:border-amber-500/50 transition-all cursor-pointer">
                        <input
                          type="radio"
                          name="orderType"
                          value={type}
                          checked={orderType === type}
                          onChange={(e) => setOrderType(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-amber-50">
                          {type === "pickup" ? "🏪 Pickup at Restaurant" : "🚗 Delivery to Address"}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <label className="text-amber-50 font-semibold">Select Branch:</label>
                    <select
                      value={chosenBranch.id}
                      onChange={(e) => setChosenBranch(branches.find(b => b.id === e.target.value))}
                      className="w-full px-4 py-3 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 focus:outline-none focus:border-amber-500 transition-all"
                    >
                      {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name} - {branch.address}
                        </option>
                      ))}
                    </select>
                  </div>

                  {orderType === "delivery" && (
                    <div className="space-y-3 p-4 border border-amber-700/30 rounded-lg">
                      <h3 className="text-amber-50 font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Delivery Address
                      </h3>
                      <input
                        type="text"
                        name="street"
                        value={deliveryAddress.street}
                        onChange={handleAddressChange}
                        placeholder="Street Address"
                        className="w-full px-4 py-2 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="text"
                        name="city"
                        value={deliveryAddress.city}
                        onChange={handleAddressChange}
                        placeholder="City/Suburb (e.g., Mutare, Harare)"
                        className="w-full px-4 py-2 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={deliveryAddress.phone}
                        onChange={handleAddressChange}
                        placeholder="Phone Number"
                        className="w-full px-4 py-2 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={handleCalculateDelivery}
                        disabled={loading}
                        className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-amber-50 font-semibold rounded-lg transition-all disabled:opacity-50"
                      >
                        {loading ? "Calculating..." : "Calculate Delivery Fee"}
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold rounded-xl transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* STEP 2: Payment */}
            {currentStep === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="text-amber-50 font-semibold flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Payment Method
                  </label>
                  <div className="space-y-3">
                    {Object.values(PAYMENT_METHODS).map(method => (
                      <label key={method.id} className="flex items-center gap-3 p-3 border border-amber-700/30 rounded-lg hover:border-amber-500/50 transition-all cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            setEcocashStatus(null);
                            setEcocashStatusMessage("");
                          }}
                          className="w-4 h-4"
                        />
                        <span className="text-amber-50">{method.icon} {method.name}</span>
                        <span className="text-amber-50/60 text-sm">{method.description}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CREDIT CARD - Paynow handles this securely */}
                {paymentMethod === "credit_card" && (
                  <div className="space-y-3 p-4 border border-amber-700/30 rounded-lg">
                    <p className="text-amber-200 text-sm font-semibold mb-2 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Card Payment via Paynow
                    </p>
                    <p className="text-amber-100 text-xs mb-3">
                      You'll be redirected to Paynow's secure payment page to enter your card details. Your card information is encrypted and never touches our server.
                    </p>
                    <div className="bg-amber-900/30 rounded-lg p-3 space-y-2 text-sm text-amber-100">
                      <p>🔒 <strong>Secured by Paynow</strong></p>
                      <p>✅ Accepts: <strong className="text-amber-300">Visa, Mastercard, American Express</strong></p>
                    </div>

                    {/* Card Payment Status */}
                    {ecocashStatus === "redirecting" && (
                      <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4 mt-2">
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                          <div>
                            <p className="text-blue-300 text-sm font-semibold">Redirecting to secure payment page...</p>
                            <p className="text-blue-400/60 text-xs mt-1">{ecocashStatusMessage}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {ecocashStatus === "confirmed" && (
                      <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-3 mt-2">
                        <p className="text-green-300 text-sm font-semibold">✅ Card payment confirmed!</p>
                      </div>
                    )}

                    {ecocashStatus === "cancelled" && (
                      <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-3 mt-2">
                        <p className="text-red-300 text-sm">❌ Payment cancelled. Please try again.</p>
                      </div>
                    )}

                    {ecocashStatus === "timeout" && (
                      <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-3 mt-2">
                        <p className="text-yellow-300 text-sm">⏰ Payment time expired. Please try again.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ECOCASH - Like betting.co.zw: Enter phone number, get push notification */}
                {paymentMethod === "ecocash" && (
                  <div className="space-y-3 p-4 border border-amber-700/30 rounded-lg">
                    <p className="text-amber-200 text-sm font-semibold mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> EcoCash Mobile Payment
                    </p>
                    <p className="text-amber-100 text-xs mb-3">
                      Enter your EcoCash registered phone number. We'll send a payment request to your phone.
                    </p>
                    <input
                      type="tel"
                      value={ecocashNumber}
                      onChange={(e) => setEcocashNumber(e.target.value.replace(/\D/g, '').slice(0, 13))}
                      placeholder="e.g., 0771234567"
                      className="w-full px-4 py-3 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500 text-lg"
                      disabled={loading && ecocashStatus === "waiting_for_pin"}
                    />
                    <p className="text-amber-400/50 text-xs">
                      This is the number registered for EcoCash. You'll receive a prompt to enter your PIN.
                    </p>

                    {/* EcoCash Status */}
                    {ecocashStatus === "waiting_for_pin" && (
                      <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4 mt-2">
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                          <div>
                            <p className="text-blue-300 text-sm font-semibold">Waiting for EcoCash approval</p>
                            <p className="text-blue-400/60 text-xs mt-1">{ecocashStatusMessage}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-blue-400/50 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>Check your phone and enter your EcoCash PIN to authorize the payment</span>
                        </div>
                      </div>
                    )}

                    {ecocashStatus === "confirmed" && (
                      <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-3 mt-2">
                        <p className="text-green-300 text-sm font-semibold">✅ EcoCash payment confirmed!</p>
                      </div>
                    )}

                    {ecocashStatus === "cancelled" && (
                      <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-3 mt-2">
                        <p className="text-red-300 text-sm">❌ Payment cancelled. Please try again.</p>
                      </div>
                    )}

                    {ecocashStatus === "timeout" && (
                      <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-3 mt-2">
                        <p className="text-yellow-300 text-sm">⏰ Payment time expired. Please try again.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* GOOGLE PAY */}
                {paymentMethod === "google_pay" && (
                  <div className="space-y-3 p-4 border border-amber-700/30 rounded-lg">
                    <p className="text-amber-200 text-sm">🔵 Google Pay will process this payment securely.</p>
                    <p className="text-amber-400/50 text-xs">A secure checkout popup will appear.</p>
                  </div>
                )}

                {/* Order Summary */}
                <div className="p-4 border border-amber-700/30 rounded-lg space-y-2 bg-amber-900/20">
                  <div className="flex justify-between text-amber-50">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  {orderType === "delivery" && deliveryFee > 0 && (
                    <div className="flex justify-between text-amber-50">
                      <span>Delivery Fee:</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-amber-700/30 pt-2 flex justify-between text-amber-300 font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  {total > 10 && (
                    <div className="text-amber-400/60 text-xs text-center pt-1">
                      ⭐ Earns 5 loyalty points
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    disabled={loading}
                    className="flex-1 py-3 bg-amber-800/50 border border-amber-700/50 text-amber-50 font-bold rounded-xl hover:bg-amber-800 transition-all disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {ecocashStatus === "waiting_for_pin" ? "Waiting for PIN..." : "Processing..."}
                      </>
                    ) : (
                      `Pay $${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          /* SUCCESS SCREEN */
          <div className="text-center py-4">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Payment Confirmed!</h3>
            <p className="text-amber-50/70 mb-4">Your order has been placed successfully.</p>
            
            <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-4 mb-4">
              <p className="text-amber-300 text-sm mb-1">Your Order Code</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-amber-50 tracking-widest">{orderCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 hover:bg-amber-800/50 rounded-lg transition-all"
                  title="Copy order code"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-amber-400" />
                  )}
                </button>
              </div>
              <p className="text-amber-400/50 text-xs mt-1">Show this code when picking up or for order inquiries</p>
            </div>

            {orderReceipt && (
              <div className="bg-amber-900/20 border border-amber-700/20 rounded-xl p-4 mb-4 text-left text-sm space-y-2">
                <p className="text-amber-300 font-bold mb-2">📋 Order Receipt</p>
                <div className="flex justify-between text-amber-100">
                  <span className="text-amber-400/70">Order:</span>
                  <span>{orderReceipt.orderCode}</span>
                </div>
                <div className="flex justify-between text-amber-100">
                  <span className="text-amber-400/70">Date:</span>
                  <span>{orderReceipt.date}</span>
                </div>
                <div className="flex justify-between text-amber-100">
                  <span className="text-amber-400/70">Branch:</span>
                  <span>{orderReceipt.branch}</span>
                </div>
                {orderReceipt.deliveryAddress && (
                  <div className="flex justify-between text-amber-100">
                    <span className="text-amber-400/70">Deliver to:</span>
                    <span className="text-right max-w-[200px]">{orderReceipt.deliveryAddress.street}, {orderReceipt.deliveryAddress.city}</span>
                  </div>
                )}
                <div className="flex justify-between text-amber-100">
                  <span className="text-amber-400/70">Payment:</span>
                  <span>{orderReceipt.paymentMethod === "credit_card" ? "💳 Card" : orderReceipt.paymentMethod === "ecocash" ? "📱 EcoCash" : "🔵 Google Pay"}</span>
                </div>
                <div className="flex justify-between text-amber-100">
                  <span className="text-amber-400/70">Transaction:</span>
                  <span className="text-xs">{orderReceipt.transactionId}</span>
                </div>
                <div className="flex justify-between text-amber-100">
                  <span className="text-amber-400/70">Reference:</span>
                  <span className="text-xs">{orderReceipt.reference}</span>
                </div>
                <div className="border-t border-amber-700/20 pt-2 mt-2 flex justify-between text-amber-200 font-bold">
                  <span>Total Paid:</span>
                  <span>${orderReceipt.total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-green-900/30 border border-green-600/30 rounded-lg">
              <p className="text-green-300 text-sm">⭐ Loyalty Points Earned: {cartTotal > 10 ? 5 : 0}</p>
              <p className="text-green-400/60 text-xs mt-1">Owner has been notified of your order</p>
            </div>

            <button
              onClick={handleCloseAfterOrder}
              className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}