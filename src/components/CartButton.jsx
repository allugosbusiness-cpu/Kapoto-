import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartButton({ onOpen }) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-20 flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-amber-50 rounded-full shadow-lg p-3 md:p-4 transition-colors"
    >
      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-300 text-amber-950 text-xs font-bold">
          {totalItems}
        </span>
      )}
    </button>
  );
}
