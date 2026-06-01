import { UtensilsCrossed, ParkingCircle, Flame, Smile, Users, Sparkles } from "lucide-react";

const features = [
  { title: "Outdoor Dining", description: "Enjoy your meal in our beautiful outdoor seating area with fresh air and a relaxing ambiance. Perfect for family gatherings and special occasions.", icon: UtensilsCrossed, imagePosition: "left" },
  { title: "Convenient Parking", description: "Dedicated parking spots available for our guests. Easy access and secure parking ensures a hassle-free dining experience.", icon: ParkingCircle, imagePosition: "right" },
  { title: "Traditional Braai", description: "Experience authentic African braai with smoke-grilled meats cooked to perfection. Our braai masters prepare delicious traditional dishes.", icon: Flame, imagePosition: "left" },
  { title: "Jumping Castle for Kids", description: "Bring your children for a fun-filled experience! Our jumping castle keeps kids entertained while you relax and enjoy your meal.", icon: Smile, imagePosition: "right" },
  { title: "Friendly & Expert Staff", description: "Our welcoming and knowledgeable team is dedicated to providing exceptional service. We're here to make your dining experience memorable.", icon: Users, imagePosition: "left" },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative bg-gradient-to-b from-amber-900 via-amber-950 to-amber-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-amber-100 to-amber-300 bg-clip-text text-transparent">
              Why Choose
            </span>
            <br />
            <span className="bg-gradient-to-b from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Kapoto Restaurant
            </span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {features.map((feature, key) => {
            const IconComponent = feature.icon;
            const isRight = feature.imagePosition === "right";
            return (
              <div key={key} className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 group ${isRight ? "lg:flex-row-reverse" : ""}`}>
                {/* Icon Section */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:scale-105" />
                    <div className="relative bg-amber-950/50 backdrop-blur-sm border border-amber-700/50 rounded-xl sm:rounded-2xl p-8 sm:p-12 overflow-hidden group-hover:border-amber-500/50 transition-all duration-300 flex items-center justify-center">
                      <IconComponent className="w-24 h-24 sm:w-32 sm:h-32 text-amber-400 group-hover:text-amber-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="flex-1 w-full">
                  <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                    <h3 className="text-4xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-amber-50 group-hover:text-amber-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-amber-100/70 text-base sm:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}