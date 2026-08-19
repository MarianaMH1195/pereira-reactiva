import { useState, useEffect, useMemo } from "react";
import { comerciosMock } from "./data/mockData";
import ComercioCard from "./components/ComercioCard";
import Filtros from "./components/Filtros";
import DashboardStats from "./components/DashboardStats";
import NuevoComercioModal from MapaComercios.jsx
import { supabase } from "./lib/supabaseClient";
import MapaComercios from "./components/MapaComercios";

// 🎨 Importamos el CSS separado
import "./styles/App.css";

export default function App() {
  const [comercios, setComercios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [comunaSeleccionada, setComunaSeleccionada] = useState("Todas");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchComercios();
  }, []);

  const fetchComercios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("comercios")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setComercios(data);
      } else {
        setComercios(comerciosMock);
      }
    } catch (err) {
      console.error("Error al cargar de Supabase:", err.message);
      setComercios(comerciosMock);
    } finally {
      setLoading(false);
    }
  };

  const categorias = useMemo(
    () => [...new Set(comercios.map((item) => item.categoria))],
    [comercios]
  );
  const comunas = useMemo(
    () => [...new Set(comercios.map((item) => item.comuna))],
    [comercios]
  );

  const handleAgregarComercio = async (nuevoComercio) => {
    try {
      const { data, error } = await supabase
        .from("comercios")
        .insert([
          {
            nombre: nuevoComercio.nombre,
            categoria: nuevoComercio.categoria,
            comuna: nuevoComercio.comuna,
            direccion: nuevoComercio.direccion,
            propietario: nuevoComercio.propietario,
            contacto: nuevoComercio.contacto,
            estado: nuevoComercio.estado,
            necesidad: nuevoComercio.necesidad,
            descuento_reactivacion: nuevoComercio.descuentoReactivacion,
            imagen: nuevoComercio.imagen,
          },
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setComercios((prev) => [data[0], ...prev]);
      }
    } catch (err) {
      console.error("Error al insertar en Supabase:", err.message);
      setComercios((prev) => [nuevoComercio, ...prev]);
    }
  };

  const comerciosFiltrados = useMemo(() => {
    return comercios.filter((comercio) => {
      const coincideBusqueda =
        comercio.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        comercio.necesidad?.toLowerCase().includes(busqueda.toLowerCase());

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
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1 className="app-title">Pereira Reactiva 🚀</h1>
          <p className="app-subtitle">
            Directorio e Indicadores de Reactivación Comercial
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-registrar"
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

        {loading ? (
          <div className="text-center py-16">
            <p className="text-emerald-400 text-lg font-medium animate-pulse">
              Cargando comercios... 🔄
            </p>
          </div>
        ) : comerciosFiltrados.length > 0 ? (
          <div className="grid-comercios">
            {comerciosFiltrados.map((comercio) => (
              <ComercioCard key={comercio.id} comercio={comercio} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-lg">
              No se encontraron comercios con los filtros seleccionados.
            </p>
          </div>
        )}
      </main>

      <NuevoComercioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAgregarComercio={handleAgregarComercio}
        categorias={
          categorias.length > 0
            ? categorias
            : ["Gastronomía", "Comercio", "Servicios"]
        }
        comunas={
          comunas.length > 0 ? comunas : ["Centro", "Circunvalar", "Cuba"]
        }
      />
    </div>
  );
}