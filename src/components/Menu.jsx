import { Flame, Star, Plus, Sparkles, Menu as MenuIcon } from "lucide-react";
import { useCart } from "../CartContent";
import { useState } from "react";
import FullMenuModal from "./FullMenuModal";

const menuItems = [
  { name: "traditional chicken", description: "Fragrant African chicken cooked with love", price: "$6.00", spicy: true, popular: true, image: "/road.png" },
  { name: "Kariba bream", description: "Grilled breams with zesty African fresh herbs", price: "$7.00 to $15.00", spicy: true, popular: false, image: "/fish.png" },
  { name: "chimkuyu beef", description: "Tender dried beef stewed with aromatic African vegetables", price: "$6.00", spicy: true, popular: true, image: "/Annotation 2026-02-05 173816.jpg" },
  { name: "beef stew with covo", description: "Traditional power combo that will melt your taste-buds", price: "$6.00", spicy: false, popular: false, image: "/bhifi.png" },
  { name: "traditional platters", description: "Well crafted platters with the pure intention to take you back.", price: "$10.00", spicy: true, popular: true, image: "/Annotation 2026-02-05 174030.png" },
  { name: "Starch", description: "traditional grains crushed for your satisfication", price: "$1.00 to $3.00", spicy: true, popular: false, image: "/Annotation 2026-02-05 174109.jpg" },
  { name: "Mutsine", description: "carefully cooked traditional veges", price: "$1.00", spicy: false, popular: false, image: "/Annotation 2026-02-05 174153.png" },
  { name: "Zondo", description: "Tender beef feet cooked with african herbs", price: "$5.00", spicy: true, popular: true, image: "/Annotation 2026-02-05 174228.png" },
  { name: "Beverages", description: "Refreshing and soothing drinks to wash it all away", price: "$1.00 to $5.00", spicy: false, popular: true, image: "/maheu.png" },
  { name: "Madora", description: "Tasty and crunchy with every bite", price: "$1.00", spicy: true, popular: true, image: "/ass.jpeg" },
];

export default function Menu() {
  const { addItem } = useCart();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showFullMenu, setShowFullMenu] = useState(false);

  return (
    <section id="menu" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent">
              Our Authentic Menu
            </span>
          </h2>
          <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto">
            Discover the rich flavors of traditional African cuisine, prepared with the finest ingredients and authentic recipes passed down through generations.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group perspective-1000"
            >
              <div className={`relative bg-gradient-to-b from-amber-800/40 to-amber-900/40 backdrop-blur-sm border border-amber-700/30 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 ${hoveredIndex === index ? 'scale-[1.02] -translate-y-2' : ''}`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: hoveredIndex === index ? "rotateX(2deg) rotateY(-2deg)" : "",
                  boxShadow: hoveredIndex === index ? "0 25px 50px -12px rgba(0,0,0,0.5)" : "",
                }}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    style={{ transform: hoveredIndex === index ? "scale(1.15)" : "scale(1)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.spicy && (
                    <div className="absolute top-3 right-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full p-2 shadow-lg animate-pulse">
                      <Flame className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                      <span className="text-[10px] font-bold text-amber-950">Most Popular</span>
                    </div>
                  )}
                  <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                    <span className="px-4 py-2 bg-amber-950/80 backdrop-blur-sm rounded-full text-amber-300 font-bold text-lg border border-amber-500/30">{item.price}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-amber-50 mb-1.5 capitalize group-hover:text-amber-300 transition-colors duration-300">{item.name}</h3>
                  <p className="text-amber-100/70 text-xs sm:text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-400 font-bold text-base">{item.price}</span>
                    <button onClick={() => addItem(item)} className="group/btn relative flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-amber-50 font-semibold rounded-lg transition-all duration-300 text-xs sm:text-sm overflow-hidden hover:shadow-lg hover:shadow-amber-500/25">
                      <span className="relative z-10 flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5 transition-transform group-hover/btn:rotate-90 duration-300" />
                        Add to Cart
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    </button>
                  </div>
                </div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/5 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="text-center">
          <button
            onClick={() => setShowFullMenu(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 group"
          >
            <MenuIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            View Full Menu
            <Sparkles className="w-4 h-4 text-amber-200" />
          </button>
          <p className="text-amber-400/60 text-xs mt-3">Browse all dishes with prices & search</p>
        </div>
      </div>

      <FullMenuModal isOpen={showFullMenu} setIsOpen={setShowFullMenu} />
    </section>
  );
}