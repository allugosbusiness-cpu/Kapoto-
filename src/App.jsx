import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Reservations from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import LocationMap from "./components/LocationMap";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./CartContent";
import { LoyaltyProvider } from "./LoyaltyContext";
import CartButton from "./components/CartButton";
import CartDrawer from "./components/CartDrawer";
import LoyaltyCard from "./components/LoyaltyCard";
import { Award } from "lucide-react";

export default function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoyaltyOpen, setLoyaltyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-amber-950 to-amber-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-amber-300 text-lg font-bold animate-pulse">Kapoto Restaurant</div>
          <div className="text-amber-500/70 text-sm mt-1">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <LoyaltyProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "linear-gradient(135deg, #78350f, #451a03)",
              color: "#fef3c7",
              border: "1px solid rgba(251, 146, 60, 0.2)",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
              backdropFilter: "blur(20px)",
            },
            success: {
              iconTheme: { primary: "#fbbf24", secondary: "#78350f" },
            },
          }}
        />

        <section style={{ display: "none" }}>
          <main>
            <h1>Kapoto Restaurant - Best Restaurant in Zimbabwe</h1>
            <p>Kapoto Restaurant is one of the top restaurants in Zimbabwe, offering delicious traditional and continental meals.</p>
          </main>
        </section>

        <div className="min-h-screen bg-amber-950 text-amber-50 overflow-x-hidden">
          <Navbar scrolled={scrolled} />
          <Hero />
          <AboutUs />
          <Menu />
          <Features />
          <Reservations />
          <Testimonials />
          <LocationMap />
          <Footer />
        </div>

        {/* Floating Loyalty Button */}
        <button
          onClick={() => setLoyaltyOpen(true)}
          className="fixed bottom-6 left-6 z-50 group flex items-center gap-2 bg-gradient-to-br from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-amber-50 rounded-full shadow-2xl p-3 md:p-4 transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ boxShadow: "0 8px 32px rgba(251, 146, 60, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)" }}
        >
          <Award className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-amber-400" style={{animationDuration: "3s"}} />
        </button>

        <CartButton onOpen={() => setCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} setIsOpen={setCartOpen} />
        <LoyaltyCard isOpen={isLoyaltyOpen} setIsOpen={setLoyaltyOpen} />
      </LoyaltyProvider>
    </CartProvider>
  );
}