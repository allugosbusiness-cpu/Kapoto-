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
import CartButton from "./components/CartButton";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const [isCartOpen, setCartOpen] = useState(false);
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
    // Simulate loading for smooth entrance
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
      {/* Global toast container - futuristic style */}
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
            iconTheme: {
              primary: "#fbbf24",
              secondary: "#78350f",
            },
          },
        }}
      />

      {/* Hidden SEO section */}
      <section style={{ display: "none" }}>
        <main>
          <h1>Kapoto Restaurant - Best Restaurant in Zimbabwe</h1>
          <p>
            Kapoto Restaurant is one of the top restaurants in Zimbabwe, offering delicious traditional and continental meals.
          </p>
        </main>
      </section>

      {/* Page content */}
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

      {/* Floating cart button */}
      <CartButton onOpen={() => setCartOpen(true)} />

      {/* Sliding drawer */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setCartOpen} />
    </CartProvider>
  );
}