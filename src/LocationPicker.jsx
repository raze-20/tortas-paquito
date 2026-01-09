import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper para calcular distancia
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radio de la tierra en km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distancia en km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const LocationMarker = ({ position, setPosition, onLocationFound, maxDistance, center }) => {
  const markerRef = useRef(null);

  const map = useMapEvents({
    click() {
      // map.locate(); // Desactivamos click-to-locate para evitar saltos inesperados
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          onLocationFound(newPos);
        }
      },
    }),
    [setPosition, onLocationFound],
  );

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup>Tu ubicación de entrega</Popup>
    </Marker>
  );
};

// Componente para recentrar el mapa suavemente
const RecenterMap = ({ position }) => {
  const map = useMapEvents({});
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), { animate: true, duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

const LocationPicker = ({ onLocationChange, onGeolocationError, maxDistance = 20000, defaultCenter = { lat: 19.4326, lng: -99.1332 }, zoom = 16 }) => {
  // Default position: Provided prop or Fallback
  const [position, setPosition] = useState(defaultCenter);
  const [fetchedAddress, setFetchedAddress] = useState("Arrastra el pin a tu ubicación exacta...");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Initial geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          
          // Validar distancia inicial
          const dist = getDistanceFromLatLonInKm(defaultCenter.lat, defaultCenter.lng, newPos.lat, newPos.lng);
          
          // Si está dentro del rango, usamos su ubicación. Si no, nos quedamos en el centro por defecto.
          // Opcional: Podríamos mover el pin allá pero mostrar error. 
          // Decisión: Mover al usuario para que vea dónde está, pero marcar error si está lejos.
          setPosition(newPos);
          fetchAddress(newPos.lat, newPos.lng);
        },
        (err) => {
          console.warn("Geolocation denied or error", err);
          if (onGeolocationError) onGeolocationError(err);
          // Fallback: Usar defaultCenter (Tortas Pakito)
          setPosition(defaultCenter);
          fetchAddress(defaultCenter.lat, defaultCenter.lng);
        }
      );
    } else {
        // Fallback
        setPosition(defaultCenter);
        fetchAddress(defaultCenter.lat, defaultCenter.lng);
    }
  }, []);

  const fetchAddress = async (lat, lng) => {
    // 1. Validar Distancia
    const distKm = getDistanceFromLatLonInKm(defaultCenter.lat, defaultCenter.lng, lat, lng);
    const maxKm = maxDistance / 1000;

    if (distKm > maxKm) {
        const msg = `Estás fuera de nuestra zona de cobertura (${maxKm}km).`;
        setErrorMsg(msg);
        setFetchedAddress(msg);
        onLocationChange({
            lat, lng, address: msg, error: msg
        });
        return; // No fetch address if out of range (save API calls)
    } else {
        setErrorMsg(null);
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
             headers: {
                 'User-Agent': 'TortasPaquitoApp/1.0'
             }
        }
      );
      const data = await response.json();
      const addressName = data.display_name || "Dirección no encontrada";
      setFetchedAddress(addressName);
      
      onLocationChange({
        lat,
        lng,
        address: addressName,
        mapLink: `https://www.google.com/maps?q=${lat},${lng}`,
        distance: distKm
      });
    } catch (error) {
      console.error("Error fetching address:", error);
      setFetchedAddress("Error obteniendo la dirección. Intenta mover el pin de nuevo.");
      onLocationChange({
        lat,
        lng,
        address: "Ubicación Manual",
        mapLink: `https://www.google.com/maps?q=${lat},${lng}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerDrag = (newPos) => {
    fetchAddress(newPos.lat, newPos.lng);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between items-end">
        <label className="text-xs text-gray-500 font-bold">📍 Ubicación de Entrega</label>
        {errorMsg && <span className="text-xs text-red-600 font-bold animate-pulse">{errorMsg}</span>}
      </div>
      
      <div className={`w-full h-64 rounded-xl overflow-hidden shadow-md border-2 relative z-0 transition-colors ${errorMsg ? 'border-red-500' : 'border-gray-200'}`}>
        <MapContainer 
            center={defaultCenter} 
            zoom={zoom} 
            scrollWheelZoom={true} 
            attributionControl={false}
            style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Radio de Cobertura */}
          <Circle 
            center={defaultCenter}
            radius={maxDistance}
            pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.1 }}
          />

          {/* Marcador de la Tienda (Fijo) */}
          <Marker position={defaultCenter} opacity={0.6}>
             <Popup>Tortas Pakito (Central)</Popup>
          </Marker>

          {/* Marcador del Usuario (Movible) */}
          <LocationMarker 
            position={position} 
            setPosition={setPosition} 
            onLocationFound={handleMarkerDrag}
            maxDistance={maxDistance}
            center={defaultCenter}
          />
          {/* RecenterMap eliminado para mejorar fluidez */}
        </MapContainer>

        {/* Overlay de Instrucciones */}
        {!errorMsg && !loading && (
            <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-center shadow-sm pointer-events-none z-[400]">
                <p className="text-[10px] text-gray-600 font-bold">Arrastra el pin azul a tu ubicación exacta</p>
            </div>
        )}
      </div>

      <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs flex items-center gap-2">
        <span className="text-lg">🗺️</span>
        {loading ? (
            <span className="text-orange-500 font-bold">Actualizando dirección...</span>
        ) : (
            <span className={`${errorMsg ? 'text-red-500 font-bold' : 'text-gray-700'}`}>
                {fetchedAddress}
            </span>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;