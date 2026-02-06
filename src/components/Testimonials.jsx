const testimonials = [
  {
    name: "IshowSpeed",
    role: "Live streamer",
    image:
      "https://www.the-sun.com/wp-content/uploads/sites/6/2023/07/MF-ISHOWSPEED-COMP.jpg?quality=90&strip=all&w=1200&h=800&crop=1",
    content:
      "Kapoto Restaurant is an absolute gem! The authentic African flavors transported me straight to the heart of the continent. Every dish is prepared with such care and passion.",
  },
  {
    name: "Sonny",
    role: "Food Critic",
    image:
      "https://www.famousbirthdays.com/faces/side-sonny-image.jpg",
    content:
      "The ambiance, the service, and most importantly, the food - everything at Kapoto is exceptional. This is fine dining at its finest, celebrating African heritage.",
  },
  {
    name: "Dorcas Moyo",
    role: "Gospel Artist",
    image:
      "https://t792ae.c2.acecdn.net/wp-content/uploads/2023/03/Dorcas-Moyo.jpg",
    content:
      "I've traveled across Africa and dined at many restaurants, but Kapoto captures the true essence of traditional African cuisine with a modern twist. Simply unforgettable!",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative bg-amber-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16">
          {/* Left side - Header */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-amber-300">
              What our customers are saying about us
            </h2>
            <p className="text-amber-100 text-base text-xl sm:text-lg max-w-2xl mx-auto">
              Experience the authentic flavors and warm hospitality of Kapoto Restaurant through the eyes of our valued guests.
            </p>
          </div>

          {/* Right side - testimonials */}

          <div className="lg:w-1/2 w-full">
            <div className="space-y-6 sm:space-y-8">
              {testimonials.map((testimonial, key) => (
                <div
                  key={key}
                  className="bg-amber-900/50 p-4 sm:p-6 backdrop-blur-sm border border-amber-700 rounded-xl sm:rounded-2xl"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold 
                      bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text 
                      text-transparent"
                      >
                        "
                      </div>
                    </div>

                    <div className="flex-grow">
                      <p className="text-amber-50 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-amber-50 text-sm sm:text-base">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-amber-200">
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
