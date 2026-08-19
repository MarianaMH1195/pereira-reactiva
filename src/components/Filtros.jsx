export default function Filtros({
  busqueda,
  setBusqueda,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  comunaSeleccionada,
  setComunaSeleccionada,
  categorias = [],
  comunas = [],
  ubicacionUsuario,
  obtenerUbicacionUsuario,
  cargandoUbicacion,
  ordenarPorCercania,
  setOrdenarPorCercania,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 mb-8 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
        {/* Buscador */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Buscar negocio
          </label>
          <input
            type="text"
            placeholder="Ej: Café, Panadería..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Categoría
          </label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
          >
            <option value="Todas">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Comuna */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Comuna
          </label>
          <select
            value={comunaSeleccionada}
            onChange={(e) => setComunaSeleccionada(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
          >
            <option value="Todas">Todas las comunas</option>
            {comunas.map((com) => (
              <option key={com} value={com}>
                {com}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Geolocalización "Cerca de mí" */}
        <div className="md:col-span-3 lg:col-span-1 flex flex-col justify-end">
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Geolocalización
          </label>
          <button
            onClick={() => {
              if (!ubicacionUsuario) {
                obtenerUbicacionUsuario();
              } else {
                setOrdenarPorCercania(!ordenarPorCercania);
              }
            }}
            disabled={cargandoUbicacion}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all shadow-md ${
              ordenarPorCercania && ubicacionUsuario
                ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-900/30"
                : "bg-slate-950 text-emerald-400 border-slate-800 hover:border-emerald-500/50"
            }`}
          >
            <span>{cargandoUbicacion ? "⏳" : "🎯"}</span>
            {cargandoUbicacion
              ? "Obteniendo GPS..."
              : ubicacionUsuario
              ? ordenarPorCercania
                ? "Ordenado por Cercanía ✓"
                : "Ordenar por Cerca de mí"
              : "Ver Comercios Cerca de Mí"}
          </button>
        </div>
      </div>
    </div>
  );
}