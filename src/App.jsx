import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Reservations from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-amber-950 text-amber-50 overflow-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <AboutUs />
      <Menu />
      <Features />
      <Reservations />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;