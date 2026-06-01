import { MapPin, ExternalLink } from "lucide-react";

const branches = [
  {
    name: "Avondale Branch",
    address: "No.2 Chelmsford Road, Avondale",
    phone: "+263 773 372 682",
    mapUrl: "https://maps.google.com/?q=No.2+Chelmsford+Road+Avondale+Harare",
    coords: { lat: -17.7855, lng: 31.0525 },
  },
  {
    name: "Belvedere Branch",
    address: "Shop D129, Long chen Plaza, Belvedere",
    phone: "+263 772 720 984",
    mapUrl: "https://maps.google.com/?q=Long+chen+Plaza+Belvedere+Harare",
    coords: { lat: -17.8233, lng: 31.0181 },
  },
  {
    name: "Mutare Branch",
    address: "Vintcent Ave & Plantation Drive, opposite Mutare Polytechnic, Mutare",
    phone: "+263 773 372 682",
    mapUrl: "https://maps.google.com/?q=Vintcent+Avenue+and+Plantation+Drive+opposite+Mutare+Polytechnic+Zimbabwe",
    coords: { lat: -18.978718, lng: 32.679474 },
  },
];

export default function LocationMap() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-amber-950 to-amber-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
            <MapPin className="w-5 h-5 text-amber-400" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent">
              Find Us
            </span>
          </h2>
          <p className="text-amber-100/70 text-base sm:text-lg max-w-2xl mx-auto">
            Visit any of our branches for an unforgettable African dining experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {branches.map((branch, i) => (
            <div
              key={i}
              className="group bg-amber-900/30 backdrop-blur-sm border border-amber-700/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-50 group-hover:text-amber-300 transition-colors">
                    {branch.name}
                  </h3>
                  <p className="text-amber-300/70 text-sm mt-1">{branch.address}</p>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-amber-700/30 mb-4">
                <iframe
                  title={`Map of ${branch.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${branch.coords.lng - 0.01}%2C${branch.coords.lat - 0.01}%2C${branch.coords.lng + 0.01}%2C${branch.coords.lat + 0.01}&layer=mapnik&marker=${branch.coords.lat}%2C${branch.coords.lng}`}
                />
                <div className="absolute inset-0 bg-amber-950/10 pointer-events-none" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300/70 text-sm">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{branch.phone}</span>
                </div>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-800/50 hover:bg-amber-700/50 border border-amber-700/30 hover:border-amber-500/50 rounded-lg text-amber-300 text-sm transition-all duration-300 group/btn"
                >
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  Open in Maps
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 rounded-full">
            <div className="flex items-center gap-2 text-amber-300/70 text-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
              <span>Avondale</span>
            </div>
            <div className="w-px h-4 bg-amber-700/50" />
            <div className="flex items-center gap-2 text-amber-300/70 text-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500" />
              <span>Belvedere</span>
            </div>
            <div className="w-px h-4 bg-amber-700/50" />
            <div className="flex items-center gap-2 text-amber-300/70 text-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-green-500" />
              <span>Mutare</span>
            </div>
            <div className="w-px h-4 bg-amber-700/50" />
            <div className="flex items-center gap-2 text-amber-300/70 text-sm">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>All open daily 8AM-10PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}