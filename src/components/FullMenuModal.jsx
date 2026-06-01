import { Fragment, useState, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Search, Plus, Sparkles, Flame } from "lucide-react";
import { useCart } from "../CartContent";

// Full Kapoto menu - ALL dishes with prices (no images needed)
const fullMenu = {
  "🐔 Chicken": [
    { name: "Traditional Chicken", description: "Fragrant African chicken cooked with love", price: "$6.00", spicy: true },
    { name: "Chicken Stew", description: "Hearty chicken stew with traditional spices", price: "$5.00", spicy: false },
    { name: "Grilled Chicken", description: "Char-grilled chicken with peri-peri sauce", price: "$7.00", spicy: true },
    { name: "Chicken Livers", description: "Savory chicken livers in rich gravy", price: "$4.00", spicy: false },
  ],
  "🐟 Fish": [
    { name: "Kariba Bream", description: "Grilled breams with zesty African fresh herbs", price: "$7.00 to $15.00", spicy: true },
    { name: "Fried Fish", description: "Crispy fried fish with sadza and vegetables", price: "$6.00", spicy: false },
    { name: "Fish Curry", description: "Fish simmered in aromatic curry sauce", price: "$7.00", spicy: true },
  ],
  "🥩 Beef": [
    { name: "Chimkuyu Beef", description: "Tender dried beef stewed with aromatic African vegetables", price: "$6.00", spicy: true },
    { name: "Beef Stew with Covo", description: "Traditional power combo that will melt your taste-buds", price: "$6.00", spicy: false },
    { name: "Grilled Beef Steak", description: "Premium beef steak grilled to perfection", price: "$8.00", spicy: false },
    { name: "Beef Curry", description: "Rich and flavorful beef curry", price: "$6.00", spicy: true },
    { name: "Minced Beef", description: "Savory minced beef with African herbs", price: "$5.00", spicy: false },
  ],
  "🐐 Traditional": [
    { name: "Zondo (Beef Feet)", description: "Tender beef feet cooked with African herbs", price: "$5.00", spicy: true },
    { name: "Mutsine", description: "Carefully cooked traditional vegetables", price: "$1.00", spicy: false },
    { name: "Madora", description: "Tasty and crunchy with every bite", price: "$1.00", spicy: true },
    { name: "Traditional Platters", description: "Well crafted platters with pure African flavors", price: "$10.00", spicy: true },
    { name: "Ox Tail", description: "Slow-cooked oxtail in rich gravy", price: "$8.00", spicy: false },
    { name: "Tripe", description: "Traditional tripe prepared with herbs", price: "$5.00", spicy: false },
    { name: "Mopane Worms", description: "Protein-rich traditional delicacy", price: "$2.00", spicy: true },
  ],
  "🌾 Starches": [
    { name: "Sadza", description: "Traditional maize meal - the Zimbabwean staple", price: "$1.00", spicy: false },
    { name: "Rice", description: "Steamed white rice", price: "$1.50", spicy: false },
    { name: "Starch Mix", description: "Traditional grains crushed for your satisfaction", price: "$1.00 to $3.00", spicy: true },
    { name: "Rice & Beans", description: "Rice mixed with traditional beans", price: "$2.00", spicy: false },
    { name: "Dovi (Peanut Butter Rice)", description: "Rice cooked in peanut butter sauce", price: "$2.50", spicy: false },
  ],
  "🥤 Beverages": [
    { name: "Maheu", description: "Traditional fermented maize drink", price: "$2.00", spicy: false },
    { name: "Soft Drinks", description: "Coca-Cola, Fanta, Sprite", price: "$1.00", spicy: false },
    { name: "Water", description: "Bottled still or sparkling water", price: "$1.00", spicy: false },
    { name: "Fresh Juice", description: "Seasonal fresh fruit juice", price: "$2.50", spicy: false },
    { name: "Traditional Brew", description: "Traditional African brew", price: "$3.00", spicy: false },
  ],
  "🥗 Sides": [
    { name: "Coleslaw", description: "Fresh creamy coleslaw", price: "$1.50", spicy: false },
    { name: "Green Salad", description: "Fresh garden salad with dressing", price: "$2.00", spicy: false },
    { name: "Covo (Rape)", description: "Traditional cooked greens", price: "$1.00", spicy: false },
    { name: "Sadza with Dovi", description: "Sadza served with peanut butter sauce", price: "$2.00", spicy: false },
    { name: "Chips/Fries", description: "Hot crispy french fries", price: "$2.00", spicy: false },
  ],
};

export default function FullMenuModal({ isOpen, setIsOpen }) {
  const { addItem } = useCart();
  const [search, setSearch] = useState("");

  // Flatten and filter menu based on search
  const filteredItems = useMemo(() => {
    const all = [];
    Object.entries(fullMenu).forEach(([category, items]) => {
      items.forEach((item) => {
        all.push({ ...item, category });
      });
    });
    if (!search.trim()) return all;
    const q = search.toLowerCase();
    return all.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.price.toLowerCase().includes(q)
    );
  }, [search]);

  // Group filtered items by category
  const grouped = useMemo(() => {
    const g = {};
    filteredItems.forEach((item) => {
      if (!g[item.category]) g[item.category] = [];
      g[item.category].push(item);
    });
    return g;
  }, [filteredItems]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[110]" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="relative w-full max-w-4xl h-[85vh] bg-gradient-to-b from-amber-900 to-amber-950 border border-amber-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="relative p-4 sm:p-6 border-b border-amber-700/30 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                    📋 Full Menu
                  </Dialog.Title>
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-amber-800/50 rounded-full transition-all">
                    <X className="w-5 h-5 text-amber-400" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search dishes, categories, prices..."
                    className="w-full pl-10 pr-4 py-3 bg-amber-800/30 border border-amber-700/50 rounded-xl text-amber-50 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all text-sm"
                    autoFocus
                  />
                </div>
              </div>

              {/* Menu Items - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
                {Object.entries(grouped).length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-amber-400 text-lg">No dishes found</p>
                    <p className="text-amber-500/70 text-sm mt-1">Try a different search term</p>
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-8 last:mb-0">
                      <h3 className="text-lg font-bold text-amber-300 mb-3 flex items-center gap-2 sticky top-0 bg-amber-950/90 backdrop-blur-sm py-2 z-10">
                        <Sparkles className="w-4 h-4" />
                        {category}
                        <span className="text-xs text-amber-500/70 font-normal">({items.length})</span>
                      </h3>
                      <div className="space-y-2">
                        {items.map((item, i) => (
                          <div
                            key={`${item.name}-${i}`}
                            className="group flex items-center justify-between bg-amber-900/20 border border-amber-700/20 rounded-xl px-4 py-3 hover:bg-amber-900/40 hover:border-amber-600/40 transition-all duration-200"
                          >
                            <div className="flex-1 min-w-0 mr-3">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-amber-50 text-sm capitalize">{item.name}</h4>
                                {item.spicy && <Flame className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />}
                              </div>
                              <p className="text-xs text-amber-400/70 mt-0.5 truncate">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="text-amber-400 font-bold text-sm whitespace-nowrap">{item.price}</span>
                              <button
                                onClick={() => addItem(item)}
                                className="p-2 bg-amber-700/50 hover:bg-amber-600/50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                                title="Add to cart"
                              >
                                <Plus className="w-4 h-4 text-amber-300" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-amber-700/30 flex-shrink-0">
                <p className="text-xs text-amber-400/50 text-center">
                  {filteredItems.length} dish{filteredItems.length !== 1 ? "es" : ""} found — Click + to add to cart
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}