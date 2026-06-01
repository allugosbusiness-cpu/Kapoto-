import { ShoppingCart } from "lucide-react";
import { useCart } from "../CartContent";

export default function CartButton({ onOpen }) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-amber-50 rounded-full shadow-2xl p-3 md:p-4 transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-3"
      style={{
        boxShadow: "0 8px 32px rgba(251, 146, 60, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)",
      }}
    >
      {/* Ring glow */}
      <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-amber-400" style={{animationDuration: "3s"}} />
      
      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:scale-110 transition-transform" />
      
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 text-amber-950 text-xs font-bold animate-bounce shadow-lg z-20">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}

      {/* Shimmer effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
}