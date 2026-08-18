import { comerciosMock } from "./data/mockData";
import ComercioCard from "./components/ComercioCard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <header className="max-w-7xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
          Pereira Reactiva 🚀
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Directorio e Indicadores de Reactivación Comercial
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {comerciosMock.map((comercio) => (
            <ComercioCard key={comercio.id} comercio={comercio} />
          ))}
        </div>
      </main>
    </div>
  );
}