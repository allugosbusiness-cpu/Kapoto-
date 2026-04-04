import { Flame, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

/* -------------------------------------------------
   Keep your data exactly as you had it
   ------------------------------------------------- */
const menuItems = [
  {
    name: "traditional chicken",
    description: "Fragrant African chicken cooked with love",
    price: "$6.00",
    spicy: true,
    popular: true,
    image: "/road.jpg",
  },
  {
    name: "Kariba bream",
    description: "Grilled breams with zesty African fresh herbs",
    price: "$7.00 to $15.00",
    spicy: true,
    popular: false,
    image: "/fish.jpg",
  },
  {
    name: "chimkuyu beef",
    description: "Tender dried beef stewed with aromatic African vegetables",
    price: "$6.00",
    spicy: true,
    popular: true,
    image: "/Annotation 2026-02-05 173816.jpg",
  },
  {
    name: "beef stew with covo",
    description: "Traditional power combo that will melt your taste-buds",
    price: "$6.00",
    spicy: false,
    popular: false,
    image: "/bhifi.jpg",
  },
  {
    name: "traditional platters",
    description: "Well crafted platters with the pure intention to take you back.",
    price: "$10.00",
    spicy: true,
    popular: true,
    image: "/Annotation 2026-02-05 174030.jpg",
  },
  {
    name: "Starch",
    description: "traditional grains crushed for your satisfication",
    price: "$1.00 to $3.00",
    spicy: true,
    popular: false,
    image: "/Annotation 2026-02-05 174109.jpg",
  },
  {
    name: "Mutsine",
    description: "carefully cooked traditional veges",
    price: "$1.00",
    spicy: false,
    popular: false,
    image: "/Annotation 2026-02-05 174153.jpg",
  },
  {
    name: "Zondo",
    description: "Tender beef feet cooked with african herbs",
    price: "$5.00",
    spicy: true,
    popular: true,
    image: "/Annotation 2026-02-05 174228.jpg",
  },
  {
    name: "Beverages",
    description: "Refreshing and soothing drinks to wash it all away",
    price: "$1.00 to $5.00",
    spicy: false,
    popular: true,
    image: "/maheu.jpg",
  },
  {
    name: "Madora",
    description: "Tasty and crunchy with every bite",
    price: "$1.00",
    spicy: true,
    popular: true,
    image: "/ass.jpeg",
  },
];

/* -------------------------------------------------
   Menu component – now calls addItem()
   ------------------------------------------------- */
export default function Menu() {
  const { addItem } = useCart();

  return (
    <section
      id="menu"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative bg-amber-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-amber-300">
            Our Authentic Menu
          </h2>
          <p className="text-amber-100 text-base sm:text-lg max-w-2xl mx-auto">
            Discover the rich flavors of traditional African cuisine, prepared
            with the finest ingredients and authentic recipes passed down
            through generations.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-amber-900/50 backdrop-blur-sm border border-amber-700 rounded-xl sm:rounded-2xl overflow-hidden hover:border-amber-500 transition-all duration-300 group"
            >
              {/* Image + badges */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Spicy badge */}
                {item.spicy && (
                  <div className="absolute top-3 right-3 bg-orange-500 rounded-full p-2">
                    <Flame className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
                {/* Popular badge */}
                {item.popular && (
                  <div className="absolute top-3 left-3 bg-amber-400 rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-950 text-amber-950" />
                    <span className="text-xs font-bold text-amber-950">
                      Most Popular
                    </span>
                  </div>
                )}
              </div>

              {/* Text & button */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-amber-50 mb-2">
                  {item.name}
                </h3>
                <p className="text-amber-100 text-sm sm:text-base mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-300 font-bold text-lg">
                    {item.price}
                  </span>

                  {/* Add‑to‑Cart button */}
                  <button
                    onClick={() => addItem(item)}
                    className="px-3 sm:px-4 py-2 bg-amber-600 hover:bg-amber-500 text-amber-50 font-semibold rounded-lg transition-colors duration-200 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
