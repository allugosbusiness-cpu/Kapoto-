import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import AfricaMap from "./AfricaMap";

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 transition-transform duration-200 ease-out">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1206]/95 via-[#1a1206]/90 to-amber-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10" />
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(217,119,6,0.08) 25%, transparent 25%),
            linear-gradient(225deg, rgba(217,119,6,0.08) 25%, transparent 25%),
            linear-gradient(315deg, rgba(217,119,6,0.08) 25%, transparent 25%),
            linear-gradient(45deg, rgba(217,119,6,0.08) 25%, transparent 25%)
          `,
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Kente band */}
      <div className="absolute top-0 left-0 right-0 h-2 z-20" style={{
        background: "repeating-linear-gradient(90deg, #d97706 0px, #d97706 8px, #b45309 8px, #b45309 16px, #f59e0b 16px, #f59e0b 24px, #92400e 24px, #92400e 32px, #fbbf24 32px, #fbbf24 40px, #d97706 40px, #d97706 48px)"
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20" style={{
        background: "repeating-linear-gradient(90deg, #d97706 0px, #d97706 6px, transparent 6px, transparent 12px, #f59e0b 12px, #f59e0b 18px, transparent 18px, transparent 24px)"
      }} />

      {/* Corner motifs */}
      <div className="absolute top-4 left-4 z-20 opacity-20 hidden lg:block">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#d97706" />
          <circle cx="20" cy="4" r="1.5" fill="#d97706" />
          <circle cx="40" cy="4" r="1.5" fill="#d97706" />
          <circle cx="4" cy="20" r="1.5" fill="#d97706" />
          <circle cx="4" cy="40" r="1.5" fill="#d97706" />
        </svg>
      </div>
      <div className="absolute top-4 right-4 z-20 opacity-20 hidden lg:block rotate-90">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#d97706" />
          <circle cx="20" cy="4" r="1.5" fill="#d97706" />
          <circle cx="40" cy="4" r="1.5" fill="#d97706" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 z-20 opacity-20 hidden lg:block -rotate-90">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#d97706" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 z-20 opacity-20 hidden lg:block rotate-180">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="#d97706" />
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{animationDuration: "4s"}} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{animationDuration: "6s"}} />

      {/* Floating Africa map particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`absolute ${i % 2 === 0 ? 'africa-float' : 'africa-float-reverse'}`} style={{
            left: `${8 + Math.random() * 84}%`,
            top: `${5 + Math.random() * 90}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}>
            <AfricaMap size={20 + Math.floor(Math.random() * 25)} className="text-amber-500/30" />
          </div>
        ))}
        {/* Large Africa map central */}
        <div className="absolute top-1/4 right-1/4 africa-float-slow" style={{animationDelay: "-3s"}}>
          <AfricaMap size={50} className="text-amber-500/10" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 africa-float-reverse" style={{animationDelay: "-7s"}}>
          <AfricaMap size={40} className="text-amber-500/10" />
        </div>
      </div>

      {/* Pot silhouette */}
      <div className="absolute -left-8 bottom-1/4 opacity-[0.03] pointer-events-none hidden lg:block">
        <svg width="160" height="180" viewBox="0 0 160 180" fill="none">
          <path d="M25 70 Q25 20 80 20 Q135 20 135 70 L145 120 Q145 160 80 160 Q15 160 15 120 Z" stroke="#d97706" strokeWidth="0.8" fill="rgba(217,119,6,0.04)" />
          <line x1="35" y1="42" x2="125" y2="42" stroke="#d97706" strokeWidth="0.2" />
        </svg>
      </div>
      <div className="absolute -right-12 bottom-1/3 opacity-[0.025] pointer-events-none hidden lg:block">
        <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
          <rect x="55" y="70" width="30" height="90" rx="4" fill="#d97706" />
          <path d="M15 80 Q25 30 70 20 Q115 30 125 80" stroke="#d97706" strokeWidth="0.4" fill="rgba(217,119,6,0.04)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center min-h-screen py-20 text-center">
        {/* Greeting - now includes Africa badge */}
        <div className="mb-4 animate-in slide-in-from-bottom duration-700">
          <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-700/30 bg-amber-900/20 backdrop-blur-sm">
            <AfricaMap size={18} className="text-amber-400" />
            <span className="text-amber-400/80 text-sm tracking-[0.2em] uppercase font-medium">Taste the Spirit of Africa</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </span>
        </div>

        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-2 h-2 border border-amber-500/50 rotate-45" />
          <span className="text-amber-500/40 text-2xl font-light tracking-[0.3em]">◆</span>
          <span className="w-2 h-2 border border-amber-500/50 rotate-45" />
        </div>

        {/* Logo Image - Prominently displayed */}
        <div className="mb-6 animate-in slide-in-from-bottom duration-700 delay-100">
          <div className="relative inline-block">

            <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-3xl -z-10" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-1 animate-in slide-in-from-bottom duration-700 leading-tight" style={{fontFamily: "'Fredoka', sans-serif", fontWeight: 900, letterSpacing: '-0.02em'}}>
          <span className="text-amber-50 block">Welcome to</span>
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-in slide-in-from-bottom duration-700 delay-200" style={{fontFamily: "'Great Vibes', cursive", color: '#fef3c7', letterSpacing: '0.02em'}}>
          Kapoto Restaurant
        </h2>

        <div className="flex items-center justify-center gap-3 my-6">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-amber-600" />
          <AfricaMap size={16} className="text-amber-600/40" />
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-amber-600" />
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-amber-300 font-semibold mb-1 animate-in slide-in-from-bottom duration-700 delay-300 leading-relaxed max-w-4xl">
          The very best in
          <span className="text-amber-200 block sm:inline"> African Cuisine!</span>
        </p>
        <p className="text-sm sm:text-base text-amber-500/70 mb-6 animate-in slide-in-from-bottom duration-700 delay-300 italic">
          Where every meal tells a story of our rich African heritage
        </p>

        <div className="w-32 h-px mx-auto mb-8" style={{
          background: "repeating-linear-gradient(90deg, #d97706 0px, #d97706 6px, transparent 6px, transparent 10px, #f59e0b 10px, #f59e0b 16px, transparent 16px, transparent 20px)"
        }} />

        <div className="inline-block group">
          <a
            href="#about"
            className="inline-flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95"
            style={{
              background: "conic-gradient(from 0deg, #d97706, #b45309, #92400e, #d97706, #f59e0b, #b45309, #d97706)",
              boxShadow: "0 0 0 4px rgba(251, 191, 36, 0.2), 0 0 0 8px rgba(217, 119, 6, 0.1), 0 25px 60px rgba(217, 119, 6, 0.3), inset 0 -8px 16px rgba(0,0,0,0.3)",
              animation: "floating 3s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-2 rounded-full" style={{background: "conic-gradient(from 180deg, #b45309, #92400e, #78350f, #92400e, #b45309)"}} />
            <span className="relative z-10 flex flex-col items-center">
              <AfricaMap size={22} className="text-amber-200 mb-1" />
              <span className="text-xs sm:text-sm font-bold leading-tight text-amber-100 tracking-wide">Discover</span>
              <span className="text-xs sm:text-sm font-bold text-amber-100 tracking-wide">Our Flavors</span>
            </span>
          </a>
        </div>

        <div className="mt-8 text-amber-600/50 text-xs tracking-[0.15em] uppercase animate-in slide-in-from-bottom duration-700 delay-500 flex items-center gap-2 justify-center">
          <AfricaMap size={12} className="text-amber-600/40" />
          Traditional Recipes · Fresh Ingredients · Family Heritage
          <AfricaMap size={12} className="text-amber-600/40" />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-4 h-6 rounded-full border border-amber-600/40 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-amber-400/60" />
        </div>
      </div>
    </section>
  );
}