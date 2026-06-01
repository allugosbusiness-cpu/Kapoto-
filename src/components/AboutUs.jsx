import { useRef } from "react";
import { Sparkles, ChefHat, Heart, Users } from "lucide-react";

export default function AboutUs() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-amber-950 via-amber-950 to-amber-900 overflow-hidden">
      {/* Background glow */}
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
            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent">
                About Kapoto Restaurant
              </span>
            </h2>
            <p className="text-amber-100/80 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed min-h-20">
              Welcome to Kapoto Restaurant, where authentic African culinary traditions meet modern dining excellence. Founded in 2014, our restaurant is compelled to bringing the rich, diverse flavors of Africa to your table.
            </p>
            <p className="text-amber-100/80 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed min-h-20">
              Our chefs spent years traveling across Africa, learning from local communities and mastering the traditional cooking methods that have been passed down for generations.
            </p>
            <p className="text-amber-100/80 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed min-h-20">
              We source only the finest, ethically-sourced ingredients from trusted suppliers. Every element is chosen with care and respect for our craft.
            </p>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[
                { num: "12+", label: "Years of Excellence", icon: Heart },
                { num: "5K+", label: "Happy Guests", icon: Users },
                { num: "3+", label: "Branches", icon: Sparkles },
              ].map((stat, i) => (
                <div key={i} className="group bg-amber-900/30 border border-amber-700/30 rounded-lg p-4 text-center hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1">
                  <stat.icon className="w-5 h-5 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl sm:text-4xl font-bold text-amber-300 mb-1">{stat.num}</div>
                  <p className="text-amber-100/70 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Images */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {/* Top left - stretched to fill */}
                <div className="relative h-40 sm:h-56 rounded-lg sm:rounded-xl overflow-hidden border border-amber-700/30 group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
                  <img src="/moms.png" alt="Restaurant Interior" className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Top right - stretched to fill */}
                <div className="relative h-40 sm:h-56 rounded-lg sm:rounded-xl overflow-hidden border border-amber-700/30 group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
                  <img src="/Annotation 2026-02-05 174709.png" alt="Chef Preparing Food" className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Bottom full width - stretched to fill */}
                <div className="relative h-36 sm:h-52 rounded-lg sm:rounded-xl overflow-hidden border border-amber-700/30 group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 col-span-2">
                  <img src="/sda.jpg" alt="African Dishes Spread" className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { title: "Authenticity", desc: "We honor the traditional recipes and cooking methods from across Africa, ensuring every meal is a genuine culinary experience.", color: "from-amber-500 to-orange-500" },
            { title: "Quality", desc: "Premium, ethically-sourced ingredients from trusted African suppliers ensure the highest quality in every dish we serve.", color: "from-amber-400 to-yellow-500" },
            { title: "Community", desc: "We celebrate African culture and support our communities through every meal, fostering connections and shared experiences.", color: "from-orange-500 to-amber-600" },
          ].map((item, i) => (
            <div key={i} className="group bg-amber-900/30 backdrop-blur-sm border border-amber-700/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-300 mb-3 group-hover:text-amber-200 transition-colors">{item.title}</h3>
              <p className="text-amber-100/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}