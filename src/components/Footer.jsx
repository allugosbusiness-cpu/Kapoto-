import { Globe, Camera, Mail, MapPin, Phone, Clock, Sparkles } from "lucide-react";

const footerLinks = {
  Restaurant: ["About Us", "Our Menu", "Events", "Catering", "Gallery"],
  Company: ["Contact", "Location", "Hours", "Reservations", "Careers"],
  Resources: ["Blog", "Recipes", "Events Calendar", "Gift Cards", "Reviews"],
  Legal: ["Privacy", "Terms", "Cookie Policy", "Accessibility", "Compliance"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-amber-700/50 bg-gradient-to-b from-amber-950 to-amber-950/95 overflow-hidden">
      {/* Top decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
              <div className="relative">
                <img src="/ass.jpg" alt="Kapoto Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">
                <span className="text-amber-50">Kapoto</span>
                <span className="text-amber-400">Restaurant</span>
              </span>
            </div>
            
            <div className="space-y-3 text-amber-300/70 text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>No.2 Chelmsford Road, Avondale</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Shop D129, Long chen Plaza, Belvedere</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+263 773 372 682 / +263 772 720 984</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>muzalilian@gmail.com</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Mon-Sun: 8:00 AM - 10:00 PM</span>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start space-x-3 mt-6">
              <a href="https://www.instagram.com/kapotorestaurant/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-amber-800/50 rounded-lg hover:bg-amber-700/50 border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 group">
                <Camera className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all" />
              </a>
              <a href="https://www.instagram.com/kapotorestaurant/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-amber-800/50 rounded-lg hover:bg-amber-700/50 border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 group">
                <Globe className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all" />
              </a>
              <a href="mailto:muzalilian@gmail.com" className="p-2.5 bg-amber-800/50 rounded-lg hover:bg-amber-700/50 border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 group">
                <Mail className="w-5 h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-all" />
              </a>
            </div>
          </div>

          {/* Footer links */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="font-semibold text-amber-50 mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-amber-300/60 hover:text-amber-300 transition-all duration-200 text-xs sm:text-sm hover:translate-x-1 inline-block">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
              <span className="text-amber-300/40 text-[10px]">Built with ❤️ by Allugostech</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}