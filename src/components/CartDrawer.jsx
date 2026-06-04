import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Trash2, Plus, Minus, Send, Phone, Loader2, User, MapPin, FileText, CreditCard, ShoppingBag, Mail } from "lucide-react";
import { useCart } from "../CartContent";
import { useLoyalty } from "../LoyaltyContext";
import { toast } from "react-hot-toast";

const WHATSAPP_NUMBER = "263772682771";
const WHATSAPP_API = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=`;

function formatOrderMessage(cart, totalPrice, customer, tip, discount, orderType, arrivalTime, selectedBranch) {
  let message = "🧾 *NEW ORDER - Kapoto Restaurant*\n";
  message += "═══════════════════════\n\n";
  message += "*👤 CUSTOMER DETAILS:*\n";
  if (customer.name) message += `   • Name: ${customer.name}\n`;
  if (customer.email) message += `   • Email: ${customer.email}\n`;
  if (customer.phone) message += `   • Phone: ${customer.phone}\n`;
  if (customer.notes) message += `   • Notes: ${customer.notes}\n\n`;

  message += `*🏪 Branch:* ${selectedBranch}\n`;
  message += `*🍽️ Order Type:* ${orderType === 'sit-in' ? '🪑 Sit-In (Dine at Restaurant)' : '🥡 Takeaway (Collect & Go)'}\n`;
  if (arrivalTime) message += `*⏰ Arrival Time:* ${arrivalTime}\n\n`;
  
  message += "*🍽️ ORDER ITEMS:*\n\n";
  cart.forEach((item, i) => {
    message += `*${i + 1}. ${item.name}*\n`;
    message += `   Qty: ${item.quantity} × $${item.priceNumber.toFixed(2)}\n`;
    message += `   Subtotal: $${(item.quantity * item.priceNumber).toFixed(2)}\n\n`;
  });

  message += "═══════════════════════\n";
  if (discount > 0) message += `   Discount: -$${discount.toFixed(2)}\n`;
  if (tip > 0) message += `   Tip: +$${tip.toFixed(2)}\n`;
  message += `*📊 TOTAL: $${totalPrice.toFixed(2)}*\n`;
  message += "═══════════════════════\n\n";
  message += "💳 *Payment:* Pay on arrival\n\n";
  message += "_Thank you for choosing Kapoto! 🇿🇼✨_";

  return encodeURIComponent(message);
}

const tipOptions = [10, 15, 20, 25];

const branches = [
  { id: "avondale", name: "Avondale", address: "No.2 Chelmsford Road, Avondale" },
  { id: "belvedere", name: "Belvedere", address: "Shop D129, Long chen Plaza, Belvedere" },
  { id: "mutare", name: "Mutare", address: "Mutare, Zimbabwe" },
];

// Generate time options in 30-min intervals
const timeOptions = [];
for (let h = 7; h <= 21; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hour = h.toString().padStart(2, '0');
    const min = m.toString().padStart(2, '0');
    timeOptions.push(`${hour}:${min}`);
  }
}

export default function CartDrawer({ isOpen, setIsOpen, onCheckout }) {
  const { cart, totalPrice, totalItems, removeItem, updateQuantity, clearCart } = useCart();
  const { totalOrders, rewards } = useLoyalty();
  const [isSending, setIsSending] = useState(false);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", location: "", notes: "" });
  const [orderType, setOrderType] = useState("takeaway"); // "takeaway" or "sit-in"
  const [arrivalTime, setArrivalTime] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const tipAmount = (totalPrice * tipPercentage) / 100;
  const grandTotal = totalPrice + tipAmount;

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;
    setIsSending(true);
    const message = formatOrderMessage(cart, grandTotal, customer, tipAmount, 0, orderType, arrivalTime, `${selectedBranch.name} - ${selectedBranch.address}`);
    window.open(WHATSAPP_API + message, "_blank");
    setTimeout(() => {
      toast.success("✅ Order sent via WhatsApp!", { duration: 5000, icon: "🎉" });
      clearCart();
      setCustomer({ name: "", email: "", phone: "", location: "", notes: "" });
      setTipPercentage(0);
      setOrderType("takeaway");
      setArrivalTime("");
      setIsOpen(false);
      setIsSending(false);
    }, 1000);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-4">
            <Dialog.Panel className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="relative px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <Dialog.Title className="text-lg font-bold text-gray-900">Your Order</Dialog.Title>
                    <p className="text-xs text-gray-500">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body - scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin bg-gray-50/50">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-amber-500" />
                    </div>
                    <p className="text-gray-900 text-lg font-semibold">Your cart is empty</p>
                    <p className="text-gray-500 text-sm mt-1">Add some delicious African cuisine!</p>
                    <button onClick={() => setIsOpen(false)} className="mt-6 px-6 py-2.5 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all">
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Customer Details */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-600" /> Contact Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                            placeholder="Full Name *" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                            placeholder="Email address" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm" />
                        </div>
                        <div className="relative sm:col-span-2">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" value={customer.location} onChange={(e) => setCustomer({ ...customer, location: e.target.value })}
                            placeholder="Delivery address" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm" />
                        </div>
                        <div className="relative sm:col-span-2">
                          <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                          <textarea value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                            placeholder="Special instructions, allergies, etc."
                            rows={2} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm resize-none" />
                        </div>
                      </div>
                    </div>

                    {/* Order Type & Branch */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-amber-600" /> Order Preferences
                      </h4>
                      <div className="space-y-4">
                        {/* Takeaway / Sit-In Toggle */}
                        <div>
                          <label className="text-xs text-gray-500 font-semibold mb-2 block">Order Type:</label>
                          <div className="flex gap-2">
                            <button onClick={() => setOrderType("takeaway")}
                              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                                orderType === "takeaway"
                                  ? "bg-amber-600 text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}>
                              🥡 Takeaway
                            </button>
                            <button onClick={() => setOrderType("sit-in")}
                              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                                orderType === "sit-in"
                                  ? "bg-amber-600 text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}>
                              🪑 Sit-In
                            </button>
                          </div>
                        </div>

                        {/* Branch Selection */}
                        <div>
                          <label className="text-xs text-gray-500 font-semibold mb-2 block">Select Branch:</label>
                          <select value={selectedBranch.id} onChange={(e) => setSelectedBranch(branches.find(b => b.id === e.target.value))}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm">
                            {branches.map(b => <option key={b.id} value={b.id}>{b.name} - {b.address}</option>)}
                          </select>
                        </div>

                        {/* Arrival Time */}
                        <div>
                          <label className="text-xs text-gray-500 font-semibold mb-2 block">What time will you arrive?</label>
                          <div className="grid grid-cols-4 gap-1.5 max-h-32 overflow-y-auto p-1 border border-gray-100 rounded-lg">
                            {timeOptions.map(time => (
                              <button key={time} onClick={() => setArrivalTime(arrivalTime === time ? "" : time)}
                                className={`py-1.5 px-2 rounded text-xs font-semibold transition-all ${
                                  arrivalTime === time
                                    ? "bg-amber-600 text-white"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }`}>
                                {time}
                              </button>
                            ))}
                          </div>
                          {arrivalTime && (
                            <p className="text-xs text-amber-700 mt-1 font-semibold">🕐 Arriving at {arrivalTime}</p>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                            placeholder="Phone Number" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-50">
                        <h4 className="text-sm font-bold text-gray-900">Order Items</h4>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {cart.map((item, index) => (
                          <div key={item.name} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm capitalize">{item.name}</h4>
                              <p className="text-xs text-gray-400 truncate">{item.description}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"><Minus className="w-3.5 h-3.5" /></button>
                                <span className="text-sm font-bold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"><Plus className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-bold text-gray-900 text-sm">${(item.priceNumber * item.quantity).toFixed(2)}</p>
                              <button onClick={() => removeItem(item.name)} className="text-xs text-red-400 hover:text-red-600 transition-colors mt-0.5"><Trash2 className="w-3.5 h-3.5 inline" /> Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tip Section */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-amber-600">💝</span> Add a Tip
                      </h4>
                      <div className="flex gap-2 flex-wrap">
                        {tipOptions.map((pct) => (
                          <button key={pct} onClick={() => setTipPercentage(tipPercentage === pct ? 0 : pct)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              tipPercentage === pct ? "bg-amber-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}>
                            {pct}%
                          </button>
                        ))}
                        <div className="flex-1 min-w-[100px]">
                          <input type="text" value={tipPercentage > 0 ? `$${tipAmount.toFixed(2)}` : "$0.00"} readOnly
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm font-semibold text-center" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer - Order Summary */}
              <div className="border-t border-gray-100 bg-white px-6 py-5 space-y-4">
                {/* Price breakdown */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                  {tipAmount > 0 && <div className="flex justify-between text-gray-600"><span>Tip ({tipPercentage}%)</span><span>+${tipAmount.toFixed(2)}</span></div>}
                  <div className="flex justify-between text-green-600"><span>Loyalty orders</span><span>{totalOrders} orders</span></div>
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      if (onCheckout) onCheckout();
                      else sendToWhatsApp();
                    }} 
                    disabled={cart.length === 0 || isSending || !customer.name}
                    className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : (
                      <><CreditCard className="w-4 h-4" /> Pay & Checkout 💳</>
                    )}
                  </button>
                  
                  <button 
                    onClick={sendToWhatsApp} 
                    disabled={cart.length === 0 || isSending || !customer.name}
                    className="flex-1 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Order via WhatsApp 🚀</>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  💳 Secure checkout with card/EcoCash/GooglePay or 📱 Quick order via WhatsApp
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}