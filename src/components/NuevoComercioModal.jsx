import { useState } from "react";
import PropTypes from "prop-types";

export default function NuevoComercioModal({
  isOpen,
  onClose,
  onAgregarComercio,
  categorias,
  comunas,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: categorias[0] || "Gastronomía",
    comuna: comunas[0] || "Centro",
    direccion: "",
    propietario: "",
    contacto: "",
    estado: "Operativo",
    necesidad: "",
    descuentoReactivacion: "",
    imagen:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.direccion || !formData.contacto) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    onAgregarComercio({
      ...formData,
      id: Date.now(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-xl font-bold text-white">
            Registrar Nuevo Comercio 🏪
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
        >
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nombre del Comercio *
            </label>
            <input
              type="text"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Panadería El Sol"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Categoría
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Comuna
              </label>
              <select
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {comunas.map((com) => (
                  <option key={com} value={com}>
                    {com}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Dirección *
              </label>
              <input
                type="text"
                name="direccion"
                required
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Ej: Cra 7 # 20-15"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Operativo">Operativo</option>
                <option value="En Recuperación">En Recuperación</option>
                <option value="En Riesgo">En Riesgo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Propietario / Encargado
              </label>
              <input
                type="text"
                name="propietario"
                value={formData.propietario}
                onChange={handleChange}
                placeholder="Nombre del responsable"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                WhatsApp de contacto *
              </label>
              <input
                type="text"
                name="contacto"
                required
                value={formData.contacto}
                onChange={handleChange}
                placeholder="Ej: 3101234567"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Necesidad Principal
            </label>
            <input
              type="text"
              name="necesidad"
              value={formData.necesidad}
              onChange={handleChange}
              placeholder="Ej: Clientes nuevos, insumos, etc."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Descuento / Promo Reactivación
            </label>
            <input
              type="text"
              name="descuentoReactivacion"
              value={formData.descuentoReactivacion}
              onChange={handleChange}
              placeholder="Ej: 10% de descuento en el primer pedido"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-colors"
            >
              Guardar Comercio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NuevoComercioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAgregarComercio: PropTypes.func.isRequired,
  categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
  comunas: PropTypes.arrayOf(PropTypes.string).isRequired,
};