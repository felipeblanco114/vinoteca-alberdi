import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { C } from "../theme.js";
import { formatPrice } from "../utils/format.js";

export default function FilterBar({
  query, setQuery, filters, setFilters, options, priceMin, priceMax, onReset, resultCount,
}) {
  const [open, setOpen] = useState(false);

  const Select = ({ label, field }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: C.textSoft }}>{label}</label>
      <select
        value={filters[field]}
        onChange={(e) => setFilters((f) => ({ ...f, [field]: e.target.value }))}
        className="text-sm rounded-md border px-2 py-2 bg-white"
        style={{ borderColor: C.border, color: C.text }}
      >
        <option value="">Todas</option>
        {options[field].map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="mb-5">
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 rounded-md border px-3 py-2 bg-white" style={{ borderColor: C.border }}>
          <Search size={16} color={C.textSoft} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o bodega"
            className="flex-1 text-base outline-none"
            style={{ color: C.text }}
          />
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer"
          style={{ borderColor: C.border, color: C.text, background: open ? C.accentSoft : "white" }}
        >
          <SlidersHorizontal size={16} />
          Filtros
          <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "none" }} />
        </button>
      </div>

      {open && (
        <div className="mt-3 p-3 rounded-md border grid grid-cols-2 md:grid-cols-4 gap-4" style={{ borderColor: C.border, background: "#FFFDF8" }}>
          <Select label="Bodega" field="bodega" />
          <Select label="Tipo" field="tipo" />
          <Select label="Provincia" field="provincia" />

          <div className="flex flex-col gap-1">
            <label className="text-xs" style={{ color: C.textSoft }}>
              Precio hasta {formatPrice(filters.precioMax ?? priceMax ?? 0)}
            </label>
            <input
              type="range"
              min={priceMin ?? 0}
              max={priceMax ?? 100000}
              step={500}
              value={filters.precioMax ?? priceMax ?? 0}
              onChange={(e) => setFilters((f) => ({ ...f, precioMax: Number(e.target.value) }))}
              className="w-full cursor-pointer mt-2"
              style={{ accentColor: C.accent }}
            />
          </div>

          <div className="col-span-2 md:col-span-4 flex justify-between items-center pt-1">
            <span className="text-xs" style={{ color: C.textSoft }}>{resultCount} vinos encontrados</span>
            <button onClick={onReset} className="text-xs underline cursor-pointer" style={{ color: C.accent }}>
              Limpiar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}