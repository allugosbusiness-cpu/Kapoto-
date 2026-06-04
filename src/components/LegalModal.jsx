import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Shield, FileText, Cookie, Eye, Scale } from "lucide-react";

const legalPages = {
  "Privacy": {
    icon: Shield,
    title: "Privacy Policy",
    content: `At Kapoto Restaurant, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.

Information We Collect:
• Name, email address, and phone number when you place an order
• Delivery location for order processing
• Order history to improve your experience

How We Use Your Information:
• To process and deliver your orders
• To communicate about your orders via WhatsApp
• To improve our services and menu offerings
• To send promotional offers (only with your consent)

Data Protection:
• Your data is stored securely and never shared with third parties
• You can request deletion of your data at any time
• Contact us at muzalilian@gmail.com for privacy concerns`,
  },
  "Terms": {
    icon: FileText,
    title: "Terms of Service",
    content: `By using Kapoto Restaurant's website and ordering services, you agree to these terms:

Orders & Pricing:
• All prices are in USD and subject to change without notice
• Menu items and availability may vary by location
• We reserve the right to refuse or cancel orders

Payments:
• Payment is collected upon delivery or pickup
• We accept cash, EcoCash, and mobile money

Delivery:
• Delivery areas are limited to specified zones
• Delivery times are estimates and may vary
• A delivery fee may apply based on location

Cancellations:
• Orders can be cancelled before preparation begins
• Please contact us via WhatsApp for cancellations`,
  },
  "Cookie Policy": {
    icon: Cookie,
    title: "Cookie Policy",
    content: `Kapoto Restaurant uses cookies to enhance your browsing experience.

What Are Cookies:
• Small text files stored on your browser
• Help us remember your preferences and cart items

How We Use Cookies:
• To save your cart items between sessions
• To remember your loyalty points
• To analyze website traffic and improve performance
• To provide a personalized experience

Managing Cookies:
• You can disable cookies in your browser settings
• Disabling may affect cart and loyalty functionality
• We use only essential cookies for site functionality`,
  },
  "Accessibility": {
    icon: Eye,
    title: "Accessibility Statement",
    content: `Kapoto Restaurant is committed to ensuring digital accessibility for all users.

Our Commitment:
• We strive to meet WCAG 2.1 Level AA standards
• Regular accessibility audits are conducted
• We welcome feedback on accessibility issues

Accessibility Features:
• High contrast color scheme for readability
• Responsive design for all screen sizes
• Keyboard navigable interface
• Screen reader compatible content

Contact:
If you experience any accessibility barriers, please contact us at muzalilian@gmail.com`,
  },
  "Compliance": {
    icon: Scale,
    title: "Compliance & Regulations",
    content: `Kapoto Restaurant operates in full compliance with Zimbabwean laws and regulations.

Licenses & Permits:
• Registered food establishment with City of Harare
• Compliant with Zimbabwe food safety standards
• All staff hold valid food handling certificates

Food Safety:
• We adhere to strict HACCP guidelines
• Regular health inspections conducted
• Ingredients sourced from approved suppliers

Data Compliance:
• Compliant with data protection regulations
• Customer information handled with confidentiality
• Transparent data collection practices

Health & Safety:
• COVID-19 protocols observed
• Regular sanitization of premises
• Staff wellness monitoring in place`,
  },
};

export default function LegalModal({ page, isOpen, setIsOpen }) {
  if (!page) return null;
  const legal = legalPages[page];
  if (!legal) return null;
  const IconComponent = legal.icon;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[200]" onClose={() => setIsOpen(false)}>
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
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-b from-amber-900 to-amber-950 border border-amber-700/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="relative p-6 border-b border-amber-700/30 flex-shrink-0">
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-1 hover:bg-amber-800/50 rounded-full transition-all">
                  <X className="w-5 h-5 text-amber-50" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-700 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-amber-50" />
                  </div>
                  <Dialog.Title className="text-xl font-bold text-amber-50" style={{
                    fontFamily: "'Fredoka', system-ui, sans-serif",
                    fontWeight: 700,
                  }}>
                    {legal.title}
                  </Dialog.Title>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                {legal.content.split("\n\n").map((section, i) => {
                  const lines = section.split("\n");
                  const heading = lines[0].endsWith(":") ? lines[0] : null;
                  const body = heading ? lines.slice(1).filter(l => l.trim()) : lines;
                  
                  return (
                    <div key={i} className="mb-6 last:mb-0">
                      {heading && (
                        <h4 className="text-amber-300 font-semibold text-sm mb-2">{heading}</h4>
                      )}
                      {body.map((line, j) => (
                        <p key={j} className={`text-amber-50/70 text-sm leading-relaxed ${line.startsWith("•") ? "ml-4" : ""}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-amber-700/30 flex-shrink-0">
                <p className="text-xs text-amber-400/50 text-center">
                  Last updated: June 2026 | Questions? Email muzalilian@gmail.com
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export { legalPages };