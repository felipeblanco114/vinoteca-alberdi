import BottleIcon from "./BottleIcon.jsx";
import { C, serif } from "../theme.js";
import { formatPrice } from "../utils/format.js";

export default function WineCard({ wine, onOpen }) {
  return (
    <button
      onClick={() => onOpen(wine)}
      className="flex flex-col w-full text-left rounded-lg border overflow-hidden cursor-pointer"
      style={{ background: C.card, borderColor: C.border }}
    >
      <div className="flex items-center justify-center h-48 lg:h-64 overflow-hidden" style={{ background: "#F3EFE4" }}>
        {wine.imagen ? (
          <img src={wine.imagen} alt={wine.nombre} className="w-full h-full object-cover" />
        ) : (
          <BottleIcon tipo={wine.tipo} size={92} />
        )}
      </div>
      <div className="p-4 lg:p-6">
        <p className="text-xs mb-1" style={{ color: C.textSoft }}>{wine.bodega}</p>
        <p className="text-lg leading-snug mb-1" style={{ ...serif, color: C.text }}>{wine.nombre}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs" style={{ color: C.textSoft }}>{wine.anio}</span>
          <span className="text-sm font-medium" style={{ color: C.text }}>{formatPrice(wine.precio)}</span>
        </div>
      </div>
    </button>
  );
}