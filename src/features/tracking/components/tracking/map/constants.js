export const CITY_COORDS = {
  LAGOS: { lat: 6.5244, lng: 3.3792 },
  WARRI: { lat: 5.5184, lng: 5.7512 },
  BENIN: { lat: 6.3350, lng: 5.6037 },
  ENUGU: { lat: 6.4584, lng: 7.5464 },
  'PORT HARCOURT': { lat: 4.8156, lng: 7.0498 },
  ABUJA: { lat: 9.0765, lng: 7.3986 },
  IBADAN: { lat: 7.3775, lng: 3.9470 },
  LOKOJA: { lat: 7.8024, lng: 6.7333 },
  ILORIN: { lat: 8.4799, lng: 4.5418 },
  KADUNA: { lat: 10.5105, lng: 7.4165 },
  KANO: { lat: 12.0022, lng: 8.5920 },
}

export const MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#f8f9fb' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e2e8f0' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#cbd5e1' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#dbeafe' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#93c5fd' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#e2e8f0' }] },
]

export const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: 'cooperative',
  styles: MAP_STYLES,
}

export const GOOGLE_LIBRARIES = ['places']
