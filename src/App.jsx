import { useState, useMemo } from "react";
import { comerciosMock } from "./data/mockData";
import ComercioCard from "./components/ComercioCard";
import Filtros from "./components/Filtros";
import DashboardStats from "./components/DashboardStats";
import NuevoComercioModal from "./components/NuevoComercioModal";

export default function App() {
  const [comercios, setComercios] = useState(comerciosMock);

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [comunaSeleccionada, setComunaSeleccionada] = useState("Todas");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const categorias = useMemo(
    () => [...new Set(comercios.map((item) => item.categoria))],
    [comercios]
  );
  const comunas = useMemo(
    () => [...new Set(comercios.map((item) => item.comuna))],
    [comercios]
  );

  const handleAgregarComercio = (nuevoComercio) => {
    setComercios((prev) => [nuevoComercio, ...prev]);
  };

  const comerciosFiltrados = useMemo(() => {
    return comercios.filter((comercio) => {
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
  }, [comercios, busqueda, categoriaSeleccionada, comunaSeleccionada]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            Pereira Reactiva 🚀
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Directorio e Indicadores de Reactivación Comercial de Nuestra Ciudad
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <span>➕</span> Registrar Comercio
        </button>
      </header>

      <main className="max-w-7xl mx-auto">
        <DashboardStats comercios={comercios} />

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

      <NuevoComercioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAgregarComercio={handleAgregarComercio}
        categorias={categorias}
        comunas={comunas}
      />
    </div>
  );
}