import { useState, useMemo } from "react";
import { comerciosMock } from "./data/mockData";
import ComercioCard from "./components/ComercioCard";
import Filtros from "./components/Filtros";
import DashboardStats from "./components/DashboardStats";

export default function App() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [comunaSeleccionada, setComunaSeleccionada] = useState("Todas");

  // Extraer categorías y comunas únicas
  const categorias = useMemo(
    () => [...new Set(comerciosMock.map((item) => item.categoria))],
    []
  );
  const comunas = useMemo(
    () => [...new Set(comerciosMock.map((item) => item.comuna))],
    []
  );

  // Filtrar comercios dinámicamente
  const comerciosFiltrados = useMemo(() => {
    return comerciosMock.filter((comercio) => {
      const coincideBusqueda =
        comercio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        comercio.necesidad.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoriaSeleccionada === "Todas" ||
        comercio.categoria === categoriaSeleccionada;

      const coincideComuna =
        comunaSeleccionada === "Todas" ||
        comercio.comuna === comunaSeleccionada;

      return coincideBusqueda && coincideCategoria && coincideComuna;
    });
  }, [busqueda, categoriaSeleccionada, comunaSeleccionada]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <header className="max-w-7xl mx-auto mb-8 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
          Pereira Reactiva 🚀
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Directorio e Indicadores de Reactivación Comercial de Nuestra Ciudad
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Dashboard de Indicadores */}
        <DashboardStats comercios={comerciosMock} />

        {/* Panel de Filtros */}
        <Filtros
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          comunaSeleccionada={comunaSeleccionada}
          setComunaSeleccionada={setComunaSeleccionada}
          categorias={categorias}
          comunas={comunas}
        />

        {/* Listado de tarjetas filtradas */}
        {comerciosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {comerciosFiltrados.map((comercio) => (
              <ComercioCard key={comercio.id} comercio={comercio} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-lg">
              No se encontraron comercios que coincidan con los filtros seleccionados.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}