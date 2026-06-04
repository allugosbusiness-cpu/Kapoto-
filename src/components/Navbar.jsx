import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../CartContent";

export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-amber-950/90 backdrop-blur-xl border-b border-amber-700/30 shadow-2xl shadow-amber-950/50"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      {/* Kente accent line when scrolled */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20" style={{
          background: "repeating-linear-gradient(90deg, #d97706 0px, #d97706 8px, #b45309 8px, #b45309 16px, #f59e0b 16px, #f59e0b 24px, #92400e 24px, #92400e 32px, #fbbf24 32px, #fbbf24 40px)"
        }} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <img
                src="/ass.png"
                alt="KapotoRestaurant"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-md group-hover:blur-xl transition-all duration-300" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white" style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 800,
            }}>
              <span className="text-white">Kapoto</span>
              <span className="text-amber-300 ml-1">Restaurant</span>
            </span>
          </a>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {["About", "Menu", "Features", "Reservations", "Testimonials"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-4 py-2 text-white hover:text-white text-sm lg:text-base font-medium transition-all duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
            {/* African decorative dot on nav end */}
            <div className="ml-2 w-1.5 h-1.5 rounded-full bg-amber-600/40 animate-pulse" style={{animationDuration: "3s"}} />
          </div>

          {/* Cart indicator + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Cart badge on desktop */}
            {totalItems > 0 && (
              <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-amber-800/50 border border-amber-700/50 rounded-full text-sm text-amber-300 font-bold">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </div>
            )}

            <button
              className="md:hidden p-2 text-white hover:text-white rounded-lg hover:bg-amber-800/50 transition-all duration-200"
              onClick={() => setMobileMenuIsOpen((prev) => !prev)}
            >
              {mobileMenuIsOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuIsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-amber-950/95 backdrop-blur-xl border-t border-amber-700/30 shadow-2xl">
          {/* Kente accent under mobile menu header */}
          <div className="h-0.5" style={{
            background: "repeating-linear-gradient(90deg, #d97706 0px, #d97706 6px, #b45309 6px, #b45309 12px, #f59e0b 12px, #f59e0b 18px, #92400e 18px, #92400e 24px, #fbbf24 24px, #fbbf24 30px)"
          }} />
          <div className="px-4 py-4 space-y-2">
            {["About", "Menu", "Features", "Reservations", "Testimonials"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuIsOpen(false)}
                className="block px-4 py-3 text-white hover:text-white hover:bg-amber-800/50 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600/40" />
                  {item}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
