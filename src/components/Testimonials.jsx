import { Star, Sparkles, Quote } from "lucide-react";

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
    <section id="testimonials" className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative bg-gradient-to-b from-amber-900 to-amber-950 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16">
          {/* Left side - Header */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent">
                What our customers are saying about us
              </span>
            </h2>
            <p className="text-amber-100/70 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              Experience the authentic flavors and warm hospitality of Kapoto Restaurant through the eyes of our valued guests.
            </p>
            {/* Decorative */}
            <div className="hidden lg:block mt-8">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Right side - testimonials */}
          <div className="lg:w-1/2 w-full">
            <div className="space-y-6 sm:space-y-8">
              {testimonials.map((testimonial, key) => (
                <div
                  key={key}
                  className="group bg-gradient-to-br from-amber-900/40 to-amber-950/40 p-4 sm:p-6 backdrop-blur-sm border border-amber-700/30 rounded-xl sm:rounded-2xl hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400/40 group-hover:text-amber-400/60 transition-colors" />
                    </div>

                    <div className="flex-grow">
                      <p className="text-amber-50/80 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-500/30 group-hover:border-amber-400/50 transition-all duration-300"
                        />
                        <div>
                          <h4 className="font-semibold text-amber-50 text-sm sm:text-base">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-amber-400/80">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
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