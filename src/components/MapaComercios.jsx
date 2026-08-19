import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 📍 Corrección para evitar que los iconos de los pines se rompan en Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Coordenadas fijas por comuna de Pereira (se usarán si el comercio no tiene lat/lng exactas)
const COORDENADAS_COMUNAS = {
  Centro: [4.8143, -75.6946],
  Circunvalar: [4.8115, -75.6885],
  Cuba: [4.8025, -75.7289],
  Dosquebradas: [4.8340, -75.6780],
  "Cerritos / Galicia": [4.8080, -75.7850],
};

export default function MapaComercios({ comercios }) {
  // Coordenadas centrales de Pereira
  const centroPereira = [4.8143, -75.6946];

  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-8 relative z-0">
      <MapContainer
        center={centroPereira}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {comercios.map((comercio) => {
          // Asigna la ubicación si existe lat/lng en la BD, o toma una coordenada aprox según su comuna
          const lat =
            comercio.latitud ||
            COORDENADAS_COMUNAS[comercio.comuna]?.[0] ||
            4.8143;
          const lng =
            comercio.longitud ||
            COORDENADAS_COMUNAS[comercio.comuna]?.[1] ||
            -75.6946;

          return (
            <Marker key={comercio.id} position={[lat, lng]}>
              <Popup>
                <div className="p-1 text-slate-900">
                  <h3 className="font-bold text-base">{comercio.nombre}</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {comercio.categoria} • {comercio.comuna}
                  </p>
                  <p className="text-xs mt-1">📍 {comercio.direccion}</p>
                  {comercio.contacto && (
                    <p className="text-xs font-semibold text-emerald-700 mt-1">
                      📞 {comercio.contacto}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}