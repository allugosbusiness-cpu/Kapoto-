import { Utensils } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-900 to-amber-950 relative overflow-hidden">
      <div className="text-amber-50 text-center">
        {/* Heading with fade-in and slide-in from top */}
        <h1 className="text-6xl font-bold mb-4 text-amber-300 font-fredoka animate-in slide-in-from-top duration-700 flex flex-col items-center">
          <span className="pulse-glow animate-in duration-1500 font-fredoka">
            Welcome to Kapoto Restaurant
          </span>
        </h1>
        
        {/* Tagline with slide-in from bottom and delay */}
        <p className="text-2xl text-amber-100 font-fredoka animate-in slide-in-from-bottom duration-700 delay-300 hover:scale-105 transition-transform cursor-pointer">
          The very best in african cuisine!
        </p>

        {/* CTA Button with 3D plate effect and cutlery */}
        <div className="mt-8 relative inline-block">
          <a href="#about" className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-b from-amber-300 to-orange-400 text-amber-950 font-bold rounded-full hover:scale-110 transition-all duration-300 animate-in slide-in-from-bottom duration-700 delay-500 relative" style={{ 
            animation: 'bounce-slide 2s ease-in-out 0.8s both',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset -2px -2px 8px rgba(0, 0, 0, 0.2), inset 2px 2px 8px rgba(255, 255, 255, 0.3), 0 0 30px rgba(251, 146, 60, 0.5)',
            border: '3px solid rgba(251, 146, 60, 0.5)'
          }}>
            <span className="text-center text-sm">Take a Journey With Us</span>
          </a>
          
          {/* Fork and Knife on the right */}
          <div className="absolute right-0 top-1/2 transform translate-x-16 -translate-y-1/2 animate-in slide-in-from-right duration-700 delay-500">
            <Utensils size={40} className="text-amber-300 drop-shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}