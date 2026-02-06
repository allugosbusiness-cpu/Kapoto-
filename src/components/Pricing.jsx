import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Family Dinner",
    price: "50",
    description: "Perfect for families (4-6 people)",
    features: [
      "4-6 guest seating",
      "Outdoor dining area",
      "Jumping castle for kids",
      "Complimentary parking",
      "Expert braai service",
      "Friendly staff assistance",
      "Traditional African menu",
    ],
    mostPopular: false,
  },
  {
    name: "Party Package",
    price: "100",
    description: "Ideal for celebrations (10-25 people)",
    features: [
      "10-25 guest seating",
      "Prime outdoor location",
      "Jumping castle included",
      "Reserved parking area",
      "Professional braai masters",
      "Dedicated event staff",
      "Premium braai menu",
      "Welcome drinks",
    ],
    mostPopular: true,
  },
  {
    name: "Corporate Event",
    price: "150",
    description: "For large gatherings (25+ people)",
    features: [
      "25+ guest capacity",
      "Full outdoor space reservation",
      "Kids entertainment area",
      "Ample private parking",
      "Expert braai team",
      "Dedicated event coordinator",
      "Premium braai selection",
      "Beverages included",
      "Custom menu planning",
    ],
    mostPopular: false,
  },
];

export default function Reservations() {
  return (
    <section
      id="reservations"
      className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative bg-amber-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-amber-300 to-amber-200 bg-clip-text text-transparent">
              Event Packages
            </span>
            <br />
            <span className="bg-gradient-to-b from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Zimbabwe's Finest Braai
            </span>
          </h2>
          <p className="text-amber-100 text-base text-xl sm:text-lg max-w-2xl mx-auto">
            Experience authentic African dining in the heart of Zimbabwe. All packages include premium service and traditional African cuisine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
          {plans.map((plan, key) => (
            <div
              key={key}
              className={`relative bg-amber-900/50 backdrop-blur-sm border rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 overflow-visible group flex flex-col h-full ${
                plan.mostPopular
                  ? "border-amber-400 shadow-2xl shadow-amber-400/20 lg:scale-105"
                  : "border-amber-700 hover:border-amber-600"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none rounded-lg" />
              {plan.mostPopular && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex items-center space-x-1 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full text-xs sm:text-sm font-semibold shadow-lg text-amber-950">
                    <Star className="w-3 h-3 sm:w-3 sm:h-3 fill-amber-950" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-amber-50">
                  {plan.name}
                </h3>
                <p className="text-amber-200 text-xs sm:text-sm mb-3 sm:mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text 
                  text-transparent"
                  >
                    ${plan.price}
                  </span>
                  <span className="text-amber-200 ml-1 sm:ml-2 text-sm sm:text-base">
                    USD per person
                  </span>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-row">
                {plan.features.map((feature, featureKey) => (
                  <li
                    key={featureKey}
                    className="flex items-start space-x-2 sm:space-x-3"
                  >
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400/20 flex items-center justify-center mt-0.5">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                    </div>
                    <span className="text-amber-50 text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 mt-auto hover:scale-102 cursor-pointer text-sm sm:text-base ${
                  plan.mostPopular
                    ? "bg-gradient-to-b from-amber-400 to-orange-400 text-amber-950"
                    : "bg-amber-900/50 border border-amber-700 text-amber-50 hover:bg-amber-900"
                }`}
              >
                Reserve Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-amber-100 text-base text-xl">
            Looking for custom catering?{" "}
            <a href="chatwith.io/s/kapoto-restaurant" className="text-amber-300 hover:text-amber-200">
              Contact our event team 
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}