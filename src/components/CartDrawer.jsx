import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ isOpen, setIsOpen }) {
  const {
    cart,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={() => setIsOpen(false)}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-40"
          leave="ease-in duration-200"
          leaveFrom="opacity-40"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative w-screen max-w-md bg-amber-950 text-amber-50 shadow-xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-amber-700">
                <Dialog.Title className="text-lg font-semibold">
                  Your Cart
                </Dialog.Title>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-amber-800 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-amber-300">
                    Your cart is empty. Add something tasty!
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start gap-3 border-b border-amber-700 pb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-amber-300">{item.description}</p>

                        <div className="flex items-center mt-2 gap-2">
                          {/* Quantity controls */}
                          <button
                            onClick={() =>
                              updateQuantity(item.name, item.quantity - 1)
                            }
                            className="p-1 border border-amber-400 rounded hover:bg-amber-800 transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="px-2">{item.quantity}</span>

                          <button
                            onClick={() =>
                              updateQuantity(item.name, item.quantity + 1)
                            }
                            className="p-1 border border-amber-400 rounded hover:bg-amber-800 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>

                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.name)}
                            className="ml-auto p-1 text-amber-300 hover:text-amber-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Sub‑total for that line */}
                      <div className="text-sm font-medium">
                        ${ (item.priceNumber * item.quantity).toFixed(2) }
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer (Totals + actions) */}
              <div className="border-t border-amber-700 p-4">
                <div className="flex justify-between text-lg font-bold mb-3">
                  <span>Total:</span>
                  <span>${ totalPrice.toFixed(2) }</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={clearCart}
                    disabled={cart.length === 0}
                    className="flex-1 py-2 bg-amber-700 hover:bg-amber-600 text-amber-50 font-medium rounded disabled:opacity-50 transition"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => {
                      // 🎉 You can hook this up to a checkout flow
                      toast.success("Order placed! (demo)");
                      clearCart();
                      setIsOpen(false);
                    }}
                    disabled={cart.length === 0}
                    className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-amber-50 font-medium rounded disabled:opacity-50 transition"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
