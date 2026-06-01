import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-hot-toast";

/* ────────────────────────────────────────────────
   Types (plain JS – you can switch to TS if you prefer)
   ──────────────────────────────────────────────── */
const CartContext = createContext(null);

/* ---------- reducer ---------- */
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item } = action;
      // Find existing entry (by name – you can use an ID if you have one)
      const existing = state.find((i) => i.name === item.name);
      if (existing) {
        // increase quantity
        return state.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // new entry – quantity starts at 1
      return [...state, { ...item, quantity: 1 }];
    }
    case "REMOVE_ITEM": {
      const { name } = action;
      return state.filter((i) => i.name !== name);
    }
    case "UPDATE_QUANTITY": {
      const { name, quantity } = action;
      if (quantity <= 0) {
        // auto‑remove if quantity drops to 0
        return state.filter((i) => i.name !== name);
      }
      return state.map((i) =>
        i.name === name ? { ...i, quantity } : i
      );
    }
    case "CLEAR_CART":
      return [];
    case "SET_CART":
      // used only on mount from localStorage
      return action.payload;
    default:
      return state;
  }
}

/* ---------- provider ---------- */
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    // Initialize from localStorage (if any)
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist cart on every change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ---------- actions ---------- */
  const addItem = (item) => {
    // Extract numeric price (fallback to 0 for range strings)
    const raw = item.price.replace(/[^\d.]/g, ""); // "$7.00 to $15.00" → "7.0015.00"
    // Grab the first number only
    const priceNumber = parseFloat(raw.split(/[^\d.]+/)[0]) || 0;
    const enriched = { ...item, priceNumber };
    dispatch({ type: "ADD_ITEM", item: enriched });
    toast.success(`${item.name} added to cart`);
  };

  const removeItem = (name) => {
    dispatch({ type: "REMOVE_ITEM", name });
    toast(`Removed ${name}`);
  };

  const updateQuantity = (name, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", name, quantity });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast("Cart cleared");
  };

  /* ---------- derived values ---------- */
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, i) => sum + i.quantity * i.priceNumber,
    0
  );

  const value = {
    cart,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

/* ---------- hook ---------- */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
