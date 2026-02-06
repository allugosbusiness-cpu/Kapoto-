import { Github, Twitter, Linkedin, Mail, Instagram, Facebook } from "lucide-react";

const footerLinks = {
  Restaurant: ["About Us", "Our Menu", "Events", "Catering", "Gallery"],
  Company: ["Contact", "Location", "Hours", "Reservations", "Careers"],
  Resources: [
    "Blog",
    "Recipes",
    "Events Calendar",
    "Gift Cards",
    "Reviews",
  ],
  Legal: ["Privacy", "Terms", "Cookie Policy", "Accessibility", "Compliance"],
};

export default function Footer() {
  return (
    <footer className="border-t border-amber-700 bg-amber-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Main footer content - hidden on mobile, visible on sm and up */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          <div className="col-span-1 sm:col-span-3 lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-4">
              <div className="rounded-lg">
                <img
                  src="/ass.jpg"
                  alt="Kapoto Logo"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold">
                <span className="text-amber-50">Kapoto</span>
                <span className="text-amber-300">Restaurant</span>
              </span>
            </div>
            <p className="text-amber-100 mb-4 sm:mb-6 max-w-xs mx-auto sm:mx-0 text-sm sm:text-base">
              Experience authentic African cuisine with modern dining excellence. Call us on 0773372682 for deliveries.
            </p>
            
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              <a
                href="#"
                className="p-2 sm:p-2.5 bg-amber-800 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 sm:w-5 sm:h-5 text-amber-300" />
              </a>
              <a
                href="https://www.instagram.com/kapotorestaurant/"
                className="p-2 sm:p-2.5 bg-amber-800 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5 sm:w-5 sm:h-5 text-amber-300" />
              </a>
              <a
                href="https://www.instagram.com/kapotorestaurant/"
                className="p-2 sm:p-2.5 bg-amber-800 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5 sm:w-5 sm:h-5 text-amber-300" />
              </a>
              <a
                href="#"
                className="p-2 sm:p-2.5 bg-amber-800 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 sm:w-5 sm:h-5 text-amber-300" />
                </a>
            </div>
          </div>

          {/* Footer links - visible on sm and up */}
          <div className="sm:col-span-3 lg:col-span-4">
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="font-semibold text-amber-50 mb-3 sm:mb-4 text-sm sm:text-base">
                    {category}
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-amber-100 hover:text-amber-50 transition-colors duration-200 text-xs sm:text-sm"
                        >
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

        <div className="pt-6 sm:pt-8 border-t-0 sm:border-t border-amber-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-amber-100 text-xs sm:text-sm">
              © 2025 Kapoto Restaurant. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <a
                href="#"
                className="text-amber-100 hover:text-amber-50 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-amber-100 hover:text-amber-50 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-amber-100 hover:text-amber-50 transition-colors duration-200"
              >
                By Allugostech 0782351265
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}