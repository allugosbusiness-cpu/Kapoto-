import { UtensilsCrossed, ParkingCircle, Flame, Users, Smile } from "lucide-react";

const features = [
  {
    title: "Outdoor Dining",
    description:
      "Enjoy your meal in our beautiful outdoor seating area with fresh air and a relaxing ambiance. Perfect for family gatherings and special occasions.",
    icon: UtensilsCrossed,
    imagePosition: "left",
  },
  {
    title: "Convenient Parking",
    description:
      "Dedicated parking spots available for our guests. Easy access and secure parking ensures a hassle-free dining experience.",
    icon: ParkingCircle,
    imagePosition: "right",
  },
  {
    title: "Traditional Braai",
    description:
      "Experience authentic African braai with smoke-grilled meats cooked to perfection. Our braai masters prepare delicious traditional dishes that will leave you craving for more.",
    icon: Flame,
    imagePosition: "left",
  },
  {
    title: "Jumping Castle for Kids",
    description:
      "Bring your children for a fun-filled experience! Our jumping castle keeps kids entertained while you relax and enjoy your meal.",
    icon: Smile,
    imagePosition: "right",
  },
  {
    title: "Friendly & Expert Staff",
    description:
      "Our welcoming and knowledgeable team is dedicated to providing exceptional service. We're here to make your dining experience memorable and delightful.",
    icon: Users,
    imagePosition: "left",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative bg-gradient-to-b from-amber-900 to-amber-950"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-amber-50 to-amber-200 bg-clip-text text-transparent">
              Why Choose
            </span>
            <br />
            <span className="bg-gradient-to-b from-amber-400 to-amber-300 bg-clip-text text-transparent">
              Kapoto Restaurant
            </span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {features.map((feature, key) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={key}
                className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${
                  feature.imagePosition === "right" ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Icon Section */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 
                    rounded-xl sm:rounded-2xl transition-all duration-500"
                    />
                    <div
                      className="relative bg-amber-950/50 backdrop-blur-sm border border-amber-700/50 
                    rounded-xl sm:rounded-2xl p-8 sm:p-12 overflow-hidden group-hover:border-amber-600/50 
                    transition-all duration-300 flex items-center justify-center"
                    >
                      <IconComponent className="w-24 h-24 sm:w-32 sm:h-32 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="flex-1 w-full">
                  <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                    <h3 className="text-4xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-amber-50">
                      {feature.title}
                    </h3>
                    <p className="text-amber-100 text-base text-xl sm:text-lg leading-relaxed">
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