import { Star, Sparkles, Quote } from "lucide-react";
import AfricaMap from "./AfricaMap";

const testimonials = [
  {
    name: "IshowSpeed",
    role: "Live streamer",
    image: "https://www.the-sun.com/wp-content/uploads/sites/6/2023/07/MF-ISHOWSPEED-COMP.jpg?quality=90&strip=all&w=1200&h=800&crop=1",
    content: "Kapoto Restaurant is an absolute gem! The authentic African flavors transported me straight to the heart of the continent. Every dish is prepared with such care and passion.",
  },
  {
    name: "Sonny",
    role: "Food Critic",
    image: "https://www.famousbirthdays.com/faces/side-sonny-image.jpg",
    content: "The ambiance, the service, and most importantly, the food - everything at Kapoto is exceptional. This is fine dining at its finest, celebrating African heritage.",
  },
  {
    name: "Dorcas Moyo",
    role: "Gospel Artist",
    image: "https://t792ae.c2.acecdn.net/wp-content/uploads/2023/03/Dorcas-Moyo.jpg",
    content: "I've traveled across Africa and dined at many restaurants, but Kapoto captures the true essence of traditional African cuisine with a modern twist. Simply unforgettable!",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative african-mudcloth overflow-hidden">
      <div className="kente-band-top" />
      <div className="kente-band-bottom" />

      {/* Africa map floating backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 africa-float" style={{animationDelay: "-4s"}}>
          <AfricaMap size={60} className="text-amber-500/4" />
        </div>
        <div className="absolute bottom-10 left-10 africa-float-reverse" style={{animationDelay: "-8s"}}>
          <AfricaMap size={45} className="text-amber-500/3" />
        </div>
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16">
          {/* Left side - Header */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div className="ndbele-diamond justify-center lg:justify-start mb-4">
              <span className="text-amber-500/60 text-2xl font-light">◆</span>
            </div>
            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" style={{
              fontFamily: "'Fredoka', system-ui, sans-serif",
              fontWeight: 800,
            }}>
              <span className="text-slate-900">
                ◆ What Our Guests Say ◆
              </span>
            </h2>
            <p className="text-slate-800 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              Experience the authentic flavors and warm hospitality of Kapoto Restaurant through the eyes of our valued guests.
            </p>
            {/* Decorative stars */}
            <div className="hidden lg:block mt-6">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="relative">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    {i === 3 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping opacity-50" />
                    )}
                  </div>
                ))}
              </div>
              {/* African decorative dots */}
              <div className="flex gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-amber-600/30" />
                <span className="w-2 h-2 rounded-full bg-amber-600/50" />
                <span className="w-2 h-2 rounded-full bg-amber-600/30" />
              </div>
            </div>
          </div>

          {/* Right side - testimonials */}
          <div className="lg:w-1/2 w-full">
            <div className="space-y-6 sm:space-y-8">
              {testimonials.map((testimonial, key) => (
                <div
                  key={key}
                  className="group african-frame bg-gradient-to-br from-amber-900/30 to-amber-950/30 p-4 sm:p-6 backdrop-blur-sm border border-amber-800/50 rounded-xl sm:rounded-2xl hover:border-amber-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500/40 group-hover:text-amber-400/60 transition-colors" />
                    </div>

                    <div className="flex-grow">
                      <p className="text-slate-800 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-700/50 group-hover:border-amber-500/50 transition-all duration-300"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-800">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Bottom decorative dot */}
                  <div className="mt-3 flex justify-end opacity-30">
                    <svg width="20" height="4" viewBox="0 0 20 4" fill="none">
                      <circle cx="2" cy="2" r="2" fill="#d97706" />
                      <circle cx="10" cy="2" r="2" fill="#d97706" />
                      <circle cx="18" cy="2" r="2" fill="#d97706" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}