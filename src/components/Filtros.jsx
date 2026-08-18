import PropTypes from 'prop-types';

export default function Filtros({
  busqueda,
  setBusqueda,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  comunaSeleccionada,
  setComunaSeleccionada,
  categorias,
  comunas,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Buscador de texto */}
      <div className="w-full md:w-1/3">
        <label className="block text-xs text-slate-400 mb-1 font-medium">Buscar negocio</label>
        <input
          type="text"
          placeholder="Ej: Café, Panadería..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-emerald-500 text-sm"
        />
      </div>

      {/* Filtro por Categoría */}
      <div className="w-full md:w-1/3">
        <label className="block text-xs text-slate-400 mb-1 font-medium">Categoría</label>
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-emerald-500 text-sm"
        >
          <option value="Todas">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por Comuna */}
      <div className="w-full md:w-1/3">
        <label className="block text-xs text-slate-400 mb-1 font-medium font-medium">Comuna</label>
        <select
          value={comunaSeleccionada}
          onChange={(e) => setComunaSeleccionada(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-emerald-500 text-sm"
        >
          <option value="Todas">Todas las comunas</option>
          {comunas.map((com) => (
            <option key={com} value={com}>
              {com}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

Filtros.propTypes = {
  busqueda: PropTypes.string.isRequired,
  setBusqueda: PropTypes.func.isRequired,
  categoriaSeleccionada: PropTypes.string.isRequired,
  setCategoriaSeleccionada: PropTypes.func.isRequired,
  comunaSeleccionada: PropTypes.string.isRequired,
  setComunaSeleccionada: PropTypes.func.isRequired,
  categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
  comunas: PropTypes.arrayOf(PropTypes.string).isRequired,
};