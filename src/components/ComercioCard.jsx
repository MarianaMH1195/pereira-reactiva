import PropTypes from 'prop-types';

export default function ComercioCard({ comercio }) {
  const estadoColor = {
    Operativo: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "En Riesgo": "bg-rose-500/20 text-rose-400 border-rose-500/30",
    "En Recuperación": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-xl flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={comercio.imagen}
          alt={comercio.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md ${
            estadoColor[comercio.estado] || "bg-slate-700 text-slate-300"
          }`}
        >
          {comercio.estado}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
            {comercio.categoria} • {comercio.comuna}
          </span>
          <h3 className="text-xl font-bold text-white mt-1 mb-2">
            {comercio.nombre}
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            📍 {comercio.direccion}
          </p>
          <div className="bg-slate-900/60 p-3 rounded-xl mb-4 border border-slate-700/50">
            <p className="text-xs text-slate-400">
              <strong className="text-slate-200">Necesidad:</strong>{" "}
              {comercio.necesidad}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
          <span className="text-xs text-emerald-300 font-medium bg-emerald-950/40 px-2 py-1 rounded">
            🏷️ {comercio.descuentoReactivacion}
          </span>
          <a
            href={`https://wa.me/57${comercio.contacto}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

ComercioCard.propTypes = {
  comercio: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    categoria: PropTypes.string,
    comuna: PropTypes.string,
    direccion: PropTypes.string,
    propietario: PropTypes.string,
    contacto: PropTypes.string,
    estado: PropTypes.string,
    necesidad: PropTypes.string,
    descuentoReactivacion: PropTypes.string,
    imagen: PropTypes.string,
  }).isRequired,
};