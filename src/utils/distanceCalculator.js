// Haversine formula to calculate distance between two coordinates
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

// Get user's city center based on their delivery address city field
function getCityCoordinates(city) {
  const cities = {
    harare: { lat: -17.8252, lng: 31.0335 },
    mutare: { lat: -18.9784, lng: 32.6795 },
    bulawayo: { lat: -20.1487, lng: 28.5872 },
    gweru: { lat: -19.4500, lng: 29.8167 },
    kwekwe: { lat: -18.9200, lng: 29.8100 },
    masvingo: { lat: -20.0744, lng: 30.8278 },
    chinhoyi: { lat: -17.3667, lng: 30.2000 },
    kadoma: { lat: -18.3333, lng: 29.9167 },
    marondera: { lat: -18.1833, lng: 31.5500 },
    bindura: { lat: -17.3000, lng: 31.3333 },
    chegutu: { lat: -18.1333, lng: 30.1500 },
    victoriafalls: { lat: -17.9244, lng: 25.8552 },
    hwange: { lat: -18.3667, lng: 26.5000 },
    kariba: { lat: -16.5167, lng: 28.8000 },
  };
  
  if (!city) return null;
  const normalized = city.trim().toLowerCase();
  return cities[normalized] || null;
}

// Calculate delivery fee based on distance (Zimbabwe realistic pricing)
export function calculateDeliveryFee(distance) {
  // Flat rates for common distances in Zimbabwe
  if (distance <= 2) return 2.00;     // Within 2km: $2.00
  if (distance <= 5) return 3.50;     // Within 5km: $3.50
  if (distance <= 10) return 5.00;    // Within 10km: $5.00
  if (distance <= 20) return 7.00;    // Within 20km: $7.00
  if (distance <= 30) return 10.00;   // Within 30km: $10.00
  if (distance <= 50) return 15.00;   // Within 50km: $15.00
  // Over 50km: $0.50 per km (discourages long-distance delivery)
  return Math.round(distance * 0.5 * 100) / 100;
}

// Get user coordinates - tries geolocation, falls back to city name
export function getUserCoordinates(deliveryCity) {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Geolocation denied or failed - try city name fallback
          const cityCoords = getCityCoordinates(deliveryCity);
          if (cityCoords) {
            resolve(cityCoords);
          } else {
            // Ultimate fallback: ask user to enter a valid city
            resolve(null);
          }
        }
      );
    } else {
      // No geolocation API - use city name
      const cityCoords = getCityCoordinates(deliveryCity);
      resolve(cityCoords);
    }
  });
}

// Validate address format
export function validateAddress(address) {
  return {
    isValid: address.street && address.city && address.phone,
    errors: {
      street: !address.street ? "Street address is required" : "",
      city: !address.city ? "City is required" : "",
      phone: !address.phone ? "Phone number is required" : "",
    },
  };
}
