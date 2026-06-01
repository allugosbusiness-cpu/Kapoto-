import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Trash2, Plus, Minus, Send, Phone, Loader2 } from "lucide-react";
import { useCart } from "../CartContent";
import { toast } from "react-hot-toast";

const WHATSAPP_NUMBER = "263772682771"; // International format without +
const WHATSAPP_API = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=`;

function formatOrderMessage(cart, totalPrice) {
  let message = "🧾 *NEW ORDER - Kapoto Restaurant*\n";
  message += "═══════════════════════\n\n";
  message += "*🍽️ ORDER ITEMS:*\n\n";

  cart.forEach((item, i) => {
    message += `*${i + 1}. ${item.name}*\n`;
    message += `   Qty: ${item.quantity} × $${item.priceNumber.toFixed(2)}\n`;
    message += `   Subtotal: $${(item.quantity * item.priceNumber).toFixed(2)}\n\n`;
  });

  message += "═══════════════════════\n";
  message += `*📊 TOTAL: $${totalPrice.toFixed(2)}*\n`;
  message += "═══════════════════════\n\n";
  message += "📍 *Location:* Kapoto Restaurant\n";
  message += "⏰ *Order Type:* Online Order\n";
  message += "💳 *Payment:* Pay on arrival\n\n";
  message += "_Thank you for choosing Kapoto! 🇿🇼✨_";

  return encodeURIComponent(message);
}

export default function CartDrawer({ isOpen, setIsOpen }) {
  const {
    cart,
    totalPrice,
    totalItems,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();
  const [isSending, setIsSending] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;
    setIsSending(true);

    const message = formatOrderMessage(cart, totalPrice);
    const url = WHATSAPP_API + message;

    // Open WhatsApp in a new tab
    window.open(url, "_blank");

    // Show success
    setTimeout(() => {
      toast.success("✅ Order sent to Kapoto via WhatsApp!", {
        duration: 5000,
        icon: "🎉",
      });
      clearCart();
      setIsOpen(false);
      setIsSending(false);
    }, 1000);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
        {/* Backdrop with blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative w-screen max-w-md bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 text-amber-50 shadow-2xl flex flex-col border-l border-amber-700/50">
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>

              {/* Header */}
              <div className="relative flex items-center justify-between p-4 sm:p-6 border-b border-amber-700/50">
                <Dialog.Title className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                  🛒 Your Order
                </Dialog.Title>
                <div className="flex items-center gap-3">
                  {totalItems > 0 && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-amber-950 text-xs font-bold animate-bounce">
                      {totalItems}
                    </span>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-amber-800/50 rounded-full transition-all duration-200 hover:rotate-90"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="text-6xl mb-4 animate-bounce">🍽️</div>
                    <p className="text-amber-300 text-lg font-medium">
                      Your cart is empty
                    </p>
                    <p className="text-amber-500 text-sm mt-1">
                      Add some delicious African cuisine!
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Customer Name Input */}
                    <div className="mb-4">
                      <label className="text-sm text-amber-300 mb-1 block">
                        Your Name (optional)
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name..."
                        className="w-full px-4 py-2 bg-amber-800/30 border border-amber-700 rounded-lg text-amber-50 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all"
                      />
                    </div>

                    {cart.map((item, index) => (
                      <div
                        key={item.name}
                        className="group relative flex items-start gap-3 sm:gap-4 bg-amber-900/30 border border-amber-700/30 rounded-xl p-3 sm:p-4 hover:bg-amber-900/50 hover:border-amber-600/50 transition-all duration-300 animate-in slide-in-from-bottom"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        {/* Item image */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border border-amber-700/50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 to-transparent" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-amber-50 text-sm sm:text-base capitalize truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.name)}
                              className="p-1 text-amber-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-amber-400 truncate mt-0.5">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-1 bg-amber-800/50 rounded-lg p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.name, item.quantity - 1)
                                }
                                className="p-1.5 hover:bg-amber-700/50 rounded-md transition-all duration-200 hover:scale-110 active:scale-95"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-sm font-bold min-w-[20px] text-center text-amber-200">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.name, item.quantity + 1)
                                }
                                className="p-1.5 hover:bg-amber-700/50 rounded-md transition-all duration-200 hover:scale-110 active:scale-95"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-sm font-bold text-amber-300">
                              ${(item.priceNumber * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="relative border-t border-amber-700/50 p-4 sm:p-6 bg-gradient-to-t from-amber-950 to-amber-900/50">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-amber-300">Subtotal ({totalItems} items)</span>
                  <span className="text-lg font-bold text-amber-200">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Additional info */}
                <div className="text-xs text-amber-500 mb-4 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>Order will be sent via WhatsApp</span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={sendToWhatsApp}
                    disabled={cart.length === 0 || isSending}
                    className="group relative w-full py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          Order via WhatsApp 🚀
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={clearCart}
                      disabled={cart.length === 0}
                      className="flex-1 py-2.5 bg-amber-800/50 hover:bg-amber-700/50 text-amber-300 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 border border-amber-700/30 text-sm"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2.5 bg-amber-800/30 hover:bg-amber-700/30 text-amber-200 font-medium rounded-lg transition-all duration-200 border border-amber-700/30 text-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}