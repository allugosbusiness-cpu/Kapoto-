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
import { CartProvider, useCart } from "./CartContent";
import { LoyaltyProvider } from "./LoyaltyContext";
import { AuthProvider, useAuth } from "./AuthContext";
import { OrdersProvider } from "./OrdersContext";
import CartButton from "./components/CartButton";
import CartDrawer from "./components/CartDrawer";
import LoyaltyCard from "./components/LoyaltyCard";
import LoginModal from "./components/LoginModal";
import CheckoutModal from "./components/CheckoutModal";
import { Award, LogOut, User } from "lucide-react";

export default function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoyaltyOpen, setLoyaltyOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
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
      <div className="fixed inset-0 z-[9999] bg-[#1a1206] flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(217, 119, 6, 0.5) 30px, rgba(217, 119, 6, 0.5) 31px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(217, 119, 6, 0.5) 30px, rgba(217, 119, 6, 0.5) 31px)
          `
        }} />
        <div className="text-center relative">
          <div className="mb-6">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto">
              <polygon points="40,5 75,20 75,60 40,75 5,60 5,20" stroke="#d97706" strokeWidth="0.5" fill="rgba(217,119,6,0.05)" />
              <polygon points="40,12 68,24 68,56 40,68 12,56 12,24" stroke="#d97706" strokeWidth="0.3" fill="none" />
              <circle cx="40" cy="40" r="8" fill="#d97706" opacity="0.15" />
              <circle cx="40" cy="40" r="3" className="animate-pulse" fill="#d97706" opacity="0.4" />
            </svg>
          </div>
          <div className="text-amber-50 text-lg font-bold animate-in slide-in-from-bottom duration-700">Kapoto Restaurant</div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-bounce" style={{animationDelay: "0s"}} />
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{animationDelay: "0.15s"}} />
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{animationDelay: "0.3s"}} />
          </div>
          <div className="text-amber-400/50 text-xs mt-4 tracking-widest uppercase">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <LoyaltyProvider>
            <AppContent 
              scrolled={scrolled} 
              isCartOpen={isCartOpen}
              setCartOpen={setCartOpen}
              isLoyaltyOpen={isLoyaltyOpen}
              setLoyaltyOpen={setLoyaltyOpen}
              isLoginOpen={isLoginOpen}
              setLoginOpen={setLoginOpen}
              isCheckoutOpen={isCheckoutOpen}
              setCheckoutOpen={setCheckoutOpen}
            />
          </LoyaltyProvider>
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}

function AppContent({
  scrolled,
  isCartOpen,
  setCartOpen,
  isLoyaltyOpen,
  setLoyaltyOpen,
  isLoginOpen,
  setLoginOpen,
  isCheckoutOpen,
  setCheckoutOpen,
}) {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart: cartItems, totalPrice: cartTotal } = useCart();

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "linear-gradient(135deg, #d97706, #b45309)",
            color: "#fef3c7",
            border: "1px solid rgba(251, 191, 36, 0.2)",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            backdropFilter: "blur(20px)",
          },
          success: {
            iconTheme: { primary: "#fef3c7", secondary: "#d97706" },
          },
        }}
      />

      <section style={{ display: "none" }}>
        <main>
          <h1>Kapoto Restaurant - Best Restaurant in Zimbabwe</h1>
          <p>Kapoto Restaurant is one of the top restaurants in Zimbabwe, offering delicious traditional and continental meals.</p>
        </main>
      </section>

      <div className="min-h-screen bg-[#fdf8f0] text-gray-800 overflow-x-hidden">
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

      {/* Floating User/Auth Button */}
      <button
        onClick={() => setLoginOpen(true)}
        className="fixed bottom-24 left-6 z-50 group flex items-center gap-2 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full shadow-2xl p-3 md:p-4 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ boxShadow: "0 8px 32px rgba(37, 99, 235, 0.3)" }}
        title={isAuthenticated ? `Logged in as ${user?.name}` : "Login / Sign Up"}
      >
        {isAuthenticated ? (
          <>
            <User className="w-5 h-5 md:w-6 md:h-6" />
            <div className="hidden md:block text-xs font-semibold">{user?.name.split(" ")[0]}</div>
          </>
        ) : (
          <User className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>

      {/* Floating Loyalty Button */}
      <button
        onClick={() => setLoyaltyOpen(true)}
        className="fixed bottom-6 left-6 z-50 group flex items-center gap-2 bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-amber-50 rounded-full shadow-2xl p-3 md:p-4 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ boxShadow: "0 8px 32px rgba(217, 119, 6, 0.3)" }}
      >
        <Award className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:scale-110 transition-transform" />
      </button>

      {/* Logout button - only show if authenticated */}
      {isAuthenticated && (
        <button
          onClick={() => {
            logout();
            setLoginOpen(false);
          }}
          className="fixed bottom-40 left-6 z-50 group flex items-center gap-2 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full shadow-2xl p-3 md:p-4 transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)" }}
          title="Logout"
        >
          <LogOut className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      <CartButton onOpen={() => setCartOpen(true)} onCheckout={() => setCheckoutOpen(true)} />
      <CartDrawer isOpen={isCartOpen} setIsOpen={setCartOpen} onCheckout={() => {
        setCartOpen(false);
        if (!isAuthenticated) {
          setLoginOpen(true);
        } else {
          setCheckoutOpen(true);
        }
      }} />
      <LoyaltyCard isOpen={isLoyaltyOpen} setIsOpen={setLoyaltyOpen} />
      <LoginModal isOpen={isLoginOpen} setIsOpen={setLoginOpen} />
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        setIsOpen={setCheckoutOpen}
        cartItems={cartItems}
        cartTotal={cartTotal}
      />
    </>
  );
}