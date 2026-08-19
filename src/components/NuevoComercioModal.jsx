import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Corrección de ícono por defecto en Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Coordenadas iniciales por defecto (Pereira Centro)
const PEREIRA_CENTER = [4.8143, -75.6946];

// Componente para detectar clics en el mapa
function SeleccionarUbicacionMap({ posicion, setPosicion }) {
  useMapEvents({
    click(e) {
      setPosicion([e.latlng.lat, e.latlng.lng]);
    },
  });

  return posicion ? <Marker position={posicion} icon={customIcon} /> : null;
}

export default function NuevoComercioModal({
  isOpen,
  onClose,
  onAgregarComercio,
  categorias = [],
  comunas = [],
}) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState(categorias[0] || "Gastronomía");
  const [comuna, setComuna] = useState(comunas[0] || "Centro");
  const [direccion, setDireccion] = useState("");
  const [propietario, setPropietario] = useState("");
  const [contacto, setContacto] = useState("");
  const [estado, setEstado] = useState("Operativo");
  const [necesidad, setNecesidad] = useState("");
  const [descuentoReactivacion, setDescuentoReactivacion] = useState("");
  const [imagen, setImagen] = useState("");
  const [posicion, setPosicion] = useState(PEREIRA_CENTER);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !direccion) {
      alert("Por favor completa al menos el nombre y la dirección.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre,
      categoria,
      comuna,
      direccion,
      propietario,
      contacto,
      estado,
      necesidad,
      descuentoReactivacion,
      imagen:
        imagen.trim() ||
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
      lat: posicion ? posicion[0] : PEREIRA_CENTER[0],
      lng: posicion ? posicion[1] : PEREIRA_CENTER[1],
    };

    onAgregarComercio(nuevo);

    // Limpiar formulario
    setNombre("");
    setDireccion("");
    setPropietario("");
    setContacto("");
    setNecesidad("");
    setDescuentoReactivacion("");
    setImagen("");
    setPosicion(PEREIRA_CENTER);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl text-white my-8">
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400">
            ➕ Registrar Nuevo Comercio
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre del Comercio *
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Café El Balcón"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Propietario / Encargado
              </label>
              <input
                type="text"
                value={propietario}
                onChange={(e) => setPropietario(e.target.value)}
                placeholder="Ej. María Gómez"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Categoría
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Comuna
              </label>
              <select
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {comunas.map((com) => (
                  <option key={com} value={com}>
                    {com}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Dirección *
              </label>
              <input
                type="text"
                required
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ej. Carrera 7 # 19-24"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Teléfono / WhatsApp
              </label>
              <input
                type="text"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                placeholder="Ej. 3101234567"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Estado de Reactivación
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Operativo">Operativo</option>
                <option value="En Recuperación">En Recuperación</option>
                <option value="En Riesgo">En Riesgo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Descuento u Oferta Especial
              </label>
              <input
                type="text"
                value={descuentoReactivacion}
                onChange={(e) => setDescuentoReactivacion(e.target.value)}
                placeholder="Ej. 10% en consumos o Combo $5.000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              URL de Imagen (Opcional)
            </label>
            <input
              type="url"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Necesidad Principal
            </label>
            <input
              type="text"
              value={necesidad}
              onChange={(e) => setNecesidad(e.target.value)}
              placeholder="Ej. Difusión, ventas online, materia prima..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* 📍 Selector interactivo en el mapa */}
          <div className="mt-4">
            <label className="block text-xs font-semibold text-emerald-400 mb-1">
              📍 Haz clic en el mapa para fijar la ubicación exacta del comercio:
            </label>
            <div className="h-52 w-full rounded-xl overflow-hidden border border-slate-800">
              <MapContainer
                center={PEREIRA_CENTER}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SeleccionarUbicacionMap
                  posicion={posicion}
                  setPosicion={setPosicion}
                />
              </MapContainer>
            </div>
            {posicion && (
              <p className="text-[11px] text-slate-400 mt-1">
                Coordenadas seleccionadas: Lat {posicion[0].toFixed(5)}, Lng{" "}
                {posicion[1].toFixed(5)}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg transition-all"
            >
              Guardar Comercio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}