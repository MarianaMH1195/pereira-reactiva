import { calcularDistanciaKm } from "../lib/distancia";

export default function ComercioCard({ comercio, ubicacionUsuario }) {
  // 1. Limpiar el número de contacto dejando solo los números
  const numeroLimpio = comercio.contacto
    ? comercio.contacto.replace(/\D/g, "")
    : "";

  // 2. Formatear con el indicativo de Colombia (+57) si no lo incluye
  const numeroWhatsApp = numeroLimpio.startsWith("57")
    ? numeroLimpio
    : `57${numeroLimpio}`;

  // 3. Crear mensaje predeterminado codificado para la URL
  const mensaje = encodeURIComponent(
    `Hola, vi tu comercio "${comercio.nombre}" en Pereira Reactiva y me gustaría obtener más información.`
  );

  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

  // 4. Calcular distancia si tenemos la ubicación del usuario y del comercio
  const distancia = ubicacionUsuario
    ? calcularDistanciaKm(
        ubicacionUsuario.lat,
        ubicacionUsuario.lng,
        comercio.lat,
        comercio.lng
      )
    : null;

  // Clases según el estado de reactivación
  const estadoStyles = {
    Operativo: "bg-emerald-950/80 text-emerald-400 border-emerald-800/60",
    "En Recuperación": "bg-amber-950/80 text-amber-400 border-amber-800/60",
    "En Riesgo": "bg-rose-950/80 text-rose-400 border-rose-800/60",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between">
      {/* Imagen del comercio */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={
            comercio.imagen ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80"
          }
          alt={comercio.nombre}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border shadow-md ${
            estadoStyles[comercio.estado] ||
            "bg-slate-800 text-slate-300 border-slate-700"
          }`}
        >
          {comercio.estado}
        </span>

        {/* Badge de distancia (solo se muestra si el usuario activó su ubicación) */}
        {distancia && (
          <span className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-500/30 shadow-lg">
            📍 {distancia} km de ti
          </span>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <span>{comercio.categoria}</span>
            <span>•</span>
            <span className="text-slate-400">{comercio.comuna}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
            {comercio.nombre}
          </h3>

          <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
            📍 {comercio.direccion || "Dirección no especificada"}
          </p>

          {comercio.necesidad && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 mb-4">
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">
                  Necesidad:
                </span>{" "}
                {comercio.necesidad}
              </p>
            </div>
          )}
        </div>

        {/* Footer con oferta y botón dinámico de WhatsApp */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1.5 rounded-lg line-clamp-1">
            🏷️ {comercio.descuento_reactivacion || "Consultar oferta"}
          </span>

          {comercio.contacto ? (
            <a
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 shrink-0"
            >
              <span>💬</span> WhatsApp
            </a>
          ) : (
            <span className="text-xs text-slate-500 italic">Sin contacto</span>
          )}
        </div>
      </div>
    </div>
  );
}