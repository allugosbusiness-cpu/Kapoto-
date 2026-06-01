import { Check, Star, Sparkles, User, MapPin, FileText, X } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "263772682771";

const plans = [
  {
    name: "Family Dinner",
    price: "10",
    description: "Perfect for families (4-6 people)",
    features: ["4-6 guest seating", "Outdoor dining area", "Jumping castle for kids", "Complimentary parking", "Expert braai service", "Friendly staff assistance", "Traditional African menu"],
    mostPopular: false,
  },
  {
    name: "Party Package",
    price: "20",
    description: "Ideal for celebrations (10-25 people)",
    features: ["10-25 guest seating", "Prime outdoor location", "Jumping castle included", "Reserved parking area", "Professional braai masters", "Dedicated event staff", "Premium braai menu", "Welcome drinks"],
    mostPopular: true,
  },
  {
    name: "Corporate Event",
    price: "15",
    description: "For large gatherings (25+ people)",
    features: ["25+ guest capacity", "Full outdoor space reservation", "Kids entertainment area", "Ample private parking", "Expert braai team", "Dedicated event coordinator", "Premium braai selection", "Beverages included", "Custom menu planning"],
    mostPopular: false,
  },
];

export default function Reservations() {
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({ name: "", location: "", notes: "" });

  const handleReserve = (plan) => {
    const msg = `🍖 *Kapoto Restaurant - Event Booking Request*
═══════════════════════

*👤 CUSTOMER DETAILS:*
   • Name: ${formData.name}
   • Location: ${formData.location}
   • Notes: ${formData.notes}
   • Phone: ${WHATSAPP_NUMBER}

*📋 Package:* ${plan.name}
*💰 Price:* $${plan.price} USD per person
*👥 Capacity:* ${plan.description}

*✨ Features Included:*
${plan.features.map(f => `  ✅ ${f}`).join('\n')}

═══════════════════════
⏰ *I'd like to book this package!*
📍 *Location:* Kapoto Restaurant, Zimbabwe

_Kindly contact me with availability and next steps._`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setShowForm(null);
    setFormData({ name: "", location: "", notes: "" });
  };

  return (
    <section id="reservations" className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 overflow-hidden">
      {/* Booking Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(null)} />
          <div className="relative bg-gradient-to-b from-amber-900 to-amber-950 border border-amber-700/50 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom duration-300">
            <button onClick={() => setShowForm(null)} className="absolute top-4 right-4 p-1 hover:bg-amber-800/50 rounded-full transition-all">
              <X className="w-5 h-5 text-amber-400" />
            </button>

            <h3 className="text-xl font-bold text-amber-300 mb-2">Reserve {showForm.name}</h3>
            <p className="text-amber-100/70 text-sm mb-6">${showForm.price} USD/person — {showForm.description}</p>

            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name *"
                  className="w-full pl-10 pr-4 py-3 bg-amber-800/30 border border-amber-700 rounded-lg text-amber-50 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Your Location"
                  className="w-full pl-10 pr-4 py-3 bg-amber-800/30 border border-amber-700 rounded-lg text-amber-50 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-3.5 w-4 h-4 text-amber-500" />
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes"
                  rows={2}
                  className="w-full pl-10 pr-4 py-3 bg-amber-800/30 border border-amber-700 rounded-lg text-amber-50 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => handleReserve(showForm)}
              disabled={!formData.name}
              className="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              Send Booking via WhatsApp 🚀
            </button>
          </div>
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-amber-200 to-amber-300 bg-clip-text text-transparent">
              Event Packages
            </span>
            <br />
            <span className="bg-gradient-to-b from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Zimbabwe's Finest Braai
            </span>
          </h2>
          <p className="text-amber-100/70 text-base sm:text-lg max-w-2xl mx-auto">
            Experience authentic African dining in the heart of Zimbabwe. All packages include premium service and traditional African cuisine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
          {plans.map((plan, key) => (
            <div
              key={key}
              className={`relative group bg-gradient-to-b ${plan.mostPopular ? "from-amber-800/40 to-amber-900/40" : "from-amber-900/30 to-amber-950/30"} backdrop-blur-sm border rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-500 flex flex-col h-full ${
                plan.mostPopular
                  ? "border-amber-500/70 shadow-2xl shadow-amber-500/20 lg:scale-105 hover:shadow-amber-500/30"
                  : "border-amber-700/30 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

              {plan.mostPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                  <div className="flex items-center space-x-1 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full text-xs sm:text-sm font-semibold shadow-xl text-amber-950">
                    <Star className="w-3 h-3 fill-amber-950" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6 sm:mb-8 relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-amber-50 group-hover:text-amber-300 transition-colors duration-300">
                  {plan.name}
                </h3>
                <p className="text-amber-200/70 text-xs sm:text-sm mb-3 sm:mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 inline-block transition-transform duration-300">
                    ${plan.price}
                  </span>
                  <span className="text-amber-300/70 ml-1 sm:ml-2 text-sm sm:text-base">USD / person</span>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1 relative z-10">
                {plan.features.map((feature, featureKey) => (
                  <li key={featureKey} className="flex items-start space-x-2 sm:space-x-3 group/feature">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 flex items-center justify-center mt-0.5 group-hover/feature:scale-110 transition-transform">
                      <Check className="w-3 h-3 text-amber-400" />
                    </div>
                    <span className="text-amber-50/80 text-sm sm:text-base group-hover/feature:text-amber-200 transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowForm(plan)}
                className={`relative w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 mt-auto overflow-hidden group/btn text-center ${
                  plan.mostPopular
                    ? "bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 hover:shadow-lg hover:shadow-amber-500/30"
                    : "bg-amber-900/50 border border-amber-700/50 text-amber-50 hover:bg-amber-800/50 hover:border-amber-500/50"
                }`}
              >
                <span className="relative z-10">Reserve Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-amber-100/70 text-base">
            Looking for custom catering?{" "}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline decoration-amber-500/30 hover:decoration-amber-400 transition-all">
              Contact our event team →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}