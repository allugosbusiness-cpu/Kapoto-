import { ShoppingBag } from "lucide-react";
import { useCart } from "../CartContent";

export default function CartButton({ onOpen }) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-full shadow-lg shadow-amber-600/25 p-3 md:p-4 transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-3"
    >
      <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:scale-110 transition-transform" />
      
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold shadow-lg z-20">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}