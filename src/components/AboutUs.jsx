import { useRef, useState, useEffect } from "react";
import { Sparkles, ChefHat, Heart, Users } from "lucide-react";
import AfricaMap from "./AfricaMap";

export default function AboutUs() {
  const sectionRef = useRef(null);
  const carouselImages = [
    "/1.png", "/2.png", "/3.png", "/4.png",
    "/bhifi.png", "/mabhonzo.jpg",
    "/Annotation 2026-02-05 174709.png",
    "/INTERIOR.png", "/Annotation 2026-02-05 174030.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
        setNextImageIndex(prev => (prev + 1) % carouselImages.length);
        setIsTransitioning(false);
      }, 600);
    }, 3500);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative african-mudcloth section-warm overflow-hidden">
      <div className="kente-band-top" />
      <div className="kente-band-bottom" />

      {/* Africa map floating backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 africa-float" style={{animationDelay: "-2s"}}>
          <AfricaMap size={80} className="text-amber-500/5" />
        </div>
        <div className="absolute -bottom-10 -left-10 africa-float-reverse" style={{animationDelay: "-6s"}}>
          <AfricaMap size={60} className="text-amber-500/4" />
        </div>
        <div className="absolute top-1/3 left-1/2 africa-float-slow" style={{animationDelay: "-10s"}}>
          <AfricaMap size={40} className="text-amber-500/3" />
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
              <ChefHat className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">Our Story</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <AfricaMap size={18} className="text-amber-500/70" />
              <span className="text-amber-500/70 text-xs tracking-[0.3em] uppercase font-medium">— Zimbabwe's Finest Traditional Cuisine —</span>
              <AfricaMap size={18} className="text-amber-500/70" />
            </div>

            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8" style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 800,
            }}>
              <span className="text-slate-900">◆ About Kapoto Restaurant ◆</span>
            </h2>
            <p className="text-slate-800 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed min-h-20">
              Welcome to Kapoto Restaurant, where authentic African culinary traditions meet modern dining excellence. Founded in 2014, our restaurant is compelled to bringing the rich, diverse flavors of Africa to your table.
            </p>
            <p className="text-slate-800 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed min-h-20">
              Our chefs spent years traveling across Africa, learning from local communities and mastering the traditional cooking methods that have been passed down for generations.
            </p>
            <p className="text-slate-800 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed min-h-20">
              We source only the finest, ethically-sourced ingredients from trusted suppliers. Every element is chosen with care and respect for our craft.
            </p>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[
                { num: "12+", label: "Years of Excellence", icon: Heart },
                { num: "5K+", label: "Happy Guests", icon: Users },
                { num: "3+", label: "Branches", icon: Sparkles },
              ].map((stat, i) => (
                <div key={i} className="group african-frame bg-amber-900/30 border border-amber-700/30 rounded-lg p-4 text-center hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1">
                  <stat.icon className="w-5 h-5 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl sm:text-4xl font-bold text-amber-50 mb-1">{stat.num}</div>
                  <p className="text-amber-50/70 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Images Carousel */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 opacity-10 pointer-events-none hidden md:block">
                <AfricaMap size={80} className="text-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Top left - Carousel 1 */}
                <div className="relative h-40 sm:h-56 md:h-72 lg:h-80 rounded-lg sm:rounded-xl overflow-hidden border border-amber-700/30 group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
                  <div className="relative w-full h-full">
                    <img
                      src={carouselImages[currentImageIndex]}
                      alt="Restaurant"
                      className={`w-full h-full object-cover object-center transition-all duration-700 ${
                        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      } group-hover:scale-110`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Top right - Carousel 2 */}
                <div className="relative h-40 sm:h-56 md:h-72 lg:h-80 rounded-lg sm:rounded-xl overflow-hidden border border-amber-700/30 group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
                  <div className="relative w-full h-full">
                    <img
                      src={carouselImages[(currentImageIndex + 1) % carouselImages.length]}
                      alt="Dishes"
                      className={`w-full h-full object-cover object-center transition-all duration-700 ${
                        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      } group-hover:scale-110`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Bottom - Carousel 3 */}
                <div className="relative h-36 sm:h-52 md:h-64 lg:h-72 rounded-lg sm:rounded-xl overflow-hidden border border-amber-700/30 group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 col-span-2">
                  <div className="relative w-full h-full">
                    <img
                      src={carouselImages[(currentImageIndex + 2) % carouselImages.length]}
                      alt="African Food"
                      className={`w-full h-full object-cover object-center transition-all duration-700 ${
                        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      } group-hover:scale-110`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 right-2 opacity-20">
                    <AfricaMap size={20} className="text-amber-500" />
                  </div>
                </div>

                {/* Image indicators */}
                <div className="col-span-2 flex justify-center gap-2 mt-4">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentImageIndex(idx);
                        setNextImageIndex((idx + 1) % carouselImages.length);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? "bg-amber-500 w-6"
                          : "bg-amber-500/30 w-1.5 hover:bg-amber-500/60"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>

        <div className="african-separator my-12">
          <AfricaMap size={16} className="text-amber-600/40" />
          <span className="text-amber-600/40 text-xs tracking-[0.5em] uppercase">✦ Traditions ✦</span>
          <AfricaMap size={16} className="text-amber-600/40" />
        </div>

        {/* Values Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { title: "Authenticity", desc: "We honor the traditional recipes and cooking methods from across Africa, ensuring every meal is a genuine culinary experience.", color: "from-amber-600 to-amber-700", pattern: "◆" },
            { title: "Quality", desc: "Premium, ethically-sourced ingredients from trusted African suppliers ensure the highest quality in every dish we serve.", color: "from-amber-500 to-amber-600", pattern: "✦" },
            { title: "Community", desc: "We celebrate African culture and support our communities through every meal, fostering connections and shared experiences.", color: "from-amber-700 to-amber-800", pattern: "◇" },
          ].map((item, i) => (
            <div key={i} className="group bg-amber-950/30 backdrop-blur-sm border border-amber-800/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-amber-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-amber-50 text-lg">{item.pattern}</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-300 mb-3 group-hover:text-amber-200 transition-colors">{item.title}</h3>
              <p className="text-amber-100/70 leading-relaxed">{item.desc}</p>
              <div className="mt-4 pt-4 border-t border-amber-700/20">
                <AfricaMap size={16} className="text-amber-600/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}