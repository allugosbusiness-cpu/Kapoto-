import { Globe, Camera, Mail, MapPin, Phone, Clock, Sparkles, Star, Menu, Calendar, Gift, MessageCircle } from "lucide-react";
import { useState } from "react";
import LegalModal from "./LegalModal";

const WHATSAPP = "https://wa.me/263772682771";

export default function Footer() {
  const [legalPage, setLegalPage] = useState(null);
  const [legalOpen, setLegalOpen] = useState(false);

  const openLegal = (page) => {
    setLegalPage(page);
    setLegalOpen(true);
  };
  return (
    <footer className="relative border-t border-amber-700/50 bg-gradient-to-b from-amber-950 to-amber-950/95 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
              <div className="relative">
                <img src="/ass.png" alt="Kapoto Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">
                <span className="text-amber-50">Kapoto</span>
                <span className="text-amber-400">Restaurant</span>
              </span>
            </div>
            
            <div className="space-y-3 text-amber-300/70 text-sm">
              <a href="/#locations" className="flex items-center justify-center sm:justify-start gap-2 hover:text-amber-200 transition-colors">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>No.2 Chelmsford Road, Avondale</span>
              </a>
              <a href="/#locations" className="flex items-center justify-center sm:justify-start gap-2 hover:text-amber-200 transition-colors">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Shop D129, Long chen Plaza, Belvedere</span>
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-amber-200 transition-colors">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+263 773 372 682 / +263 772 720 984</span>
              </a>
              <a href="mailto:muzalilian@gmail.com" className="flex items-center justify-center sm:justify-start gap-2 hover:text-amber-200 transition-colors">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>muzalilian@gmail.com</span>
              </a>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Mon-Sun: 8:00 AM - 10:00 PM</span>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start space-x-3 mt-6">
              <a href="https://www.instagram.com/kapotorestaurant/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-amber-800/50 rounded-lg hover:bg-amber-700/50 border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 group" title="Instagram">
                <Camera className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all" />
              </a>
              <a href="https://www.facebook.com/kapotorestaurant/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-amber-800/50 rounded-lg hover:bg-amber-700/50 border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 group" title="Facebook">
                <Globe className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all" />
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-amber-800/50 rounded-lg hover:bg-amber-700/50 border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 group" title="WhatsApp">
                <MessageCircle className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all" />
              </a>
              <a href="mailto:muzalilian@gmail.com" className="p-2.5 bg-amber-800/50 rounded-lg hover:bg-amber-700/50 border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 group" title="Email">
                <Mail className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all" />
              </a>
            </div>
          </div>

          {/* Footer links */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {/* Restaurant */}
              <div>
                <h3 className="font-semibold text-amber-50 mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Restaurant
                </h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">About Us</a></li>
                  <li><a href="#menu" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Our Menu</a></li>
                  <li><a href="#reservations" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Events</a></li>
                  <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Catering</a></li>
                  <li><a href="#menu" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Gallery</a></li>
                </ul>
              </div>
              {/* Company */}
              <div>
                <h3 className="font-semibold text-amber-50 mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                  <Menu className="w-3 h-3 text-amber-400" />
                  Company
                </h3>
                <ul className="space-y-2">
                  <li><a href="mailto:muzalilian@gmail.com" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Contact</a></li>
                  <li><a href="#locations" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Location</a></li>
                  <li><a href="#locations" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Hours</a></li>
                  <li><a href="#reservations" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Reservations</a></li>
                  <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Careers</a></li>
                </ul>
              </div>
              {/* Resources */}
              <div>
                <h3 className="font-semibold text-amber-50 mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                  <Star className="w-3 h-3 text-amber-400" />
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li><a href="https://www.instagram.com/kapotorestaurant/" target="_blank" rel="noopener noreferrer" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Blog</a></li>
                  <li><a href="#menu" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Recipes</a></li>
                  <li><a href="#reservations" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Events Calendar</a></li>
                  <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Gift Cards</a></li>
                  <li><a href="#testimonials" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">Reviews</a></li>
                </ul>
              </div>
              {/* Legal */}
              <div>
                <h3 className="font-semibold text-amber-50 mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li><button onClick={() => openLegal("Privacy")} className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block text-left bg-transparent border-0 cursor-pointer">Privacy</button></li>
                  <li><button onClick={() => openLegal("Terms")} className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block text-left bg-transparent border-0 cursor-pointer">Terms</button></li>
                  <li><button onClick={() => openLegal("Cookie Policy")} className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block text-left bg-transparent border-0 cursor-pointer">Cookie Policy</button></li>
                  <li><button onClick={() => openLegal("Accessibility")} className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block text-left bg-transparent border-0 cursor-pointer">Accessibility</button></li>
                  <li><button onClick={() => openLegal("Compliance")} className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block text-left bg-transparent border-0 cursor-pointer">Compliance</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-amber-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-amber-300/50 text-xs sm:text-sm">
              © 2026 Kapoto Restaurant. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <a href="#" className="text-amber-300/50 hover:text-amber-300 transition-colors">Privacy Policy</a>
              <a href="#" className="text-amber-300/50 hover:text-amber-300 transition-colors">Terms of Service</a>
              <span className="text-amber-500/30">|</span>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-amber-300/40 hover:text-amber-300 transition-colors text-[10px]">Built with ❤️ by Allugostech</a>
            </div>
          </div>
        </div>
      </div>
      <LegalModal page={legalPage} isOpen={legalOpen} setIsOpen={setLegalOpen} />
    </footer>
  );
}