import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Reservations from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import CartButton from "./components/CartButton";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CartProvider>
      {/* Global toast container */}
      <Toaster position="bottom-right" />

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
      <div className="min-h-screen bg-amber-850 text-amber-50 overflow-hidden">
        <Navbar scrolled={scrolled} />
        <Hero />
        <AboutUs />
        <Menu />
        <Features />
        <Reservations />
        <Testimonials />
        <Footer />
      </div>

      {/* Floating cart button */}
      <CartButton onOpen={() => setCartOpen(true)} />

      {/* Sliding drawer */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setCartOpen} />
    </CartProvider>
  );
}
