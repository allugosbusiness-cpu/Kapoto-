import { Utensils, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const parallaxRef = useRef(null);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="home"
      ref={parallaxRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950"
    >
      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
      />

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-amber-50 text-center px-4 max-w-5xl mx-auto">
        {/* Animated decorative top */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500" />
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500" />
        </div>

        {/* Main heading with 3D text effect */}
        <div className="relative mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold relative z-10">
            <span className="bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent animate-in slide-in-from-bottom duration-700 block">
              Welcome to
            </span>
            <span className="bg-gradient-to-b from-amber-400 via-orange-400 to-orange-500 bg-clip-text text-transparent animate-in slide-in-from-bottom duration-700 delay-200 block mt-2 drop-shadow-[0_0_30px_rgba(251,146,60,0.3)]">
              Kapoto Restaurant
            </span>
          </h1>
          {/* 3D shadow layer */}
          <h1 className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-amber-950/20 translate-y-2 blur-sm select-none pointer-events-none" aria-hidden>
            Welcome to
            Kapoto Restaurant
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-amber-100/90 font-light mb-4 animate-in slide-in-from-bottom duration-700 delay-300 max-w-3xl mx-auto">
          <span className="inline-block hover:scale-105 cursor-default transition-transform duration-300">The very best in</span>{" "}
          <span className="inline-block bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent font-bold hover:scale-105 transition-transform duration-300 cursor-default">
            African Cuisine!
          </span>
        </p>

        {/* Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mb-8 animate-in slide-in-from-bottom duration-700 delay-500" />

        {/* CTA - 3D floating plate */}
        <div className="mt-8 relative inline-block group">
          <a
            href="#about"
            className="relative inline-flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-br from-amber-300 to-orange-400 text-amber-950 font-bold rounded-full transition-all duration-500 hover:scale-110 hover:rotate-6 active:scale-95 cursor-pointer"
            style={{
              boxShadow: "0 20px 60px rgba(251, 146, 60, 0.4), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 4px 8px rgba(255,255,255,0.3)",
              border: "3px solid rgba(251, 146, 60, 0.3)",
              animation: "floating 3s ease-in-out infinite",
            }}
          >
            <span className="flex flex-col items-center">
              <span className="text-xs sm:text-sm font-bold leading-tight">Start Your</span>
              <span className="text-xs sm:text-sm font-bold">Journey</span>
            </span>
          </a>

          {/* Cutlery icons */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 animate-in slide-in-from-right duration-700 delay-500 hidden sm:block">
            <Utensils size={32} className="text-amber-400 drop-shadow-lg hover:rotate-12 transition-transform" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-400/60" />
        </div>
      </div>
    </section>
  );
}