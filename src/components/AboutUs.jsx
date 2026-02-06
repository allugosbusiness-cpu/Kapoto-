import { useState, useEffect } from "react";

function TypewriterText({ text, speed = 30, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return displayedText;
}

export default function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative bg-amber-950 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="order-2 lg:order-1 animate-in slide-in-from-bottom duration-700">
            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-amber-300 animate-in slide-in-from-top duration-700">
              About Kapoto Restaurant
            </h2>
            <p className="text-amber-100 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed min-h-20">
              <TypewriterText 
                text="Welcome to Kapoto Restaurant, where authentic African culinary traditions meet modern dining excellence. Founded in 2014, our restaurant is compelled to bringing the rich, diverse flavors of Africa to your table."
                speed={15}
                delay={300}
              />
            </p>
            <p className="text-amber-100 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed min-h-20">
              <TypewriterText 
                text="Our head chef, Chef Messi, spent years traveling across Africa, learning from local communities and mastering the traditional cooking methods that have been passed down for generations. Every dish at Kapoto tells a tale of African heritage, culture, and pride."
                speed={20}
                delay={2000}
              />
            </p>
            <p className="text-amber-100 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed min-h-20">
              <TypewriterText 
                text="We source only the finest, ethically-sourced ingredients from trusted suppliers. From the spices that dance on your palate to the grains that form the foundation of our dishes, every element is chosen with care and respect for our craft."
                speed={20}
                delay={3500}
              />
            </p>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 animate-in slide-in-from-bottom duration-700 delay-500">
              <div className="bg-amber-900/50 border border-amber-700 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 mb-2">12+</div>
                <p className="text-amber-100 text-sm">Years of Excellence</p>
              </div>
              <div className="bg-amber-900/50 border border-amber-700 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 mb-2">5K+</div>
                <p className="text-amber-100 text-sm">Happy Guests</p>
              </div>
              <div className="bg-amber-900/50 border border-amber-700 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-amber-300 mb-2">3+</div>
                <p className="text-amber-100 text-sm">Branches</p>
              </div>
            </div>
          </div>

          {/* Right side - Images */}
          <div className="order-1 lg:order-2 animate-in slide-in-from-right duration-700">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="relative h-48 sm:h-64 rounded-lg sm:rounded-xl overflow-hidden border-2 border-amber-700">
                  <img
                    src="/moms.jpg"
                    alt="Restaurant Interior"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="relative h-48 sm:h-64 rounded-lg sm:rounded-xl overflow-hidden border-2 border-amber-700">
                  <img
                    src="/Annotation 2026-02-05 174709.jpg"
                    alt="Chef Preparing Food"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="relative h-48 sm:h-64 rounded-lg sm:rounded-xl overflow-hidden border-2 border-amber-700 col-span-2">
                  <img
                    src="/mabhonzo.jpg"
                    alt="African Dishes"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-700/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-amber-900/50 border border-amber-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 animate-in slide-in-from-bottom duration-700 hover:border-amber-400 transition-colors cursor-pointer">
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Authenticity</h3>
            <p className="text-amber-100">
              We honor the traditional recipes and cooking methods from across Africa, ensuring every meal is a genuine culinary experience.
            </p>
          </div>
          <div className="bg-amber-900/50 border border-amber-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 animate-in slide-in-from-bottom duration-700 delay-200 hover:border-amber-400 transition-colors cursor-pointer">
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Quality</h3>
            <p className="text-amber-100">
              Premium, ethically-sourced ingredients from trusted African suppliers ensure the highest quality in every dish we serve.
            </p>
          </div>
          <div className="bg-amber-900/50 border border-amber-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 animate-in slide-in-from-bottom duration-700 delay-400 hover:border-amber-400 transition-colors cursor-pointer">
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Community</h3>
            <p className="text-amber-100">
              We celebrate African culture and support our communities through every meal, fostering connections and shared experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
