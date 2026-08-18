import PropTypes from 'prop-types';

export default function DashboardStats({ comercios }) {
  const total = comercios.length;
  const operativos = comercios.filter((c) => c.estado === "Operativo").length;
  const enRiesgo = comercios.filter((c) => c.estado === "En Riesgo").length;
  const enRecuperacion = comercios.filter((c) => c.estado === "En Recuperación").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Tarjeta 1: Total */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Comercios</p>
          <p className="text-3xl font-extrabold text-white mt-1">{total}</p>
        </div>
        <span className="text-3xl bg-slate-800 p-3 rounded-xl">🏪</span>
      </div>

      {/* Tarjeta 2: Operativos */}
      <div className="bg-slate-900 border border-emerald-500/20 p-5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Operativos</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">{operativos}</p>
        </div>
        <span className="text-3xl bg-emerald-950/50 p-3 rounded-xl">🟢</span>
      </div>

      {/* Tarjeta 3: En Recuperación */}
      <div className="bg-slate-900 border border-amber-500/20 p-5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">En Recuperación</p>
          <p className="text-3xl font-extrabold text-amber-400 mt-1">{enRecuperacion}</p>
        </div>
        <span className="text-3xl bg-amber-950/50 p-3 rounded-xl">📈</span>
      </div>

      {/* Tarjeta 4: En Riesgo */}
      <div className="bg-slate-900 border border-rose-500/20 p-5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs font-medium text-rose-400 uppercase tracking-wider">En Riesgo</p>
          <p className="text-3xl font-extrabold text-rose-400 mt-1">{enRiesgo}</p>
        </div>
        <span className="text-3xl bg-rose-950/50 p-3 rounded-xl">⚠️</span>
      </div>
    </div>
  );
}

DashboardStats.propTypes = {
  comercios: PropTypes.arrayOf(
    PropTypes.shape({
      estado: PropTypes.string.isRequired,
    })
  ).isRequired,
};