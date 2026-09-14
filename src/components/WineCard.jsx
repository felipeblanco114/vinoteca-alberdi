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
      <div className="flex items-center justify-center py-6" style={{ background: "#F3EFE4" }}>
        <BottleIcon tipo={wine.tipo} size={72} />
      </div>
      <div className="p-3">
        <p className="text-xs mb-1" style={{ color: C.textSoft }}>{wine.bodega}</p>
        <p className="text-base leading-snug mb-1" style={{ ...serif, color: C.text }}>{wine.nombre}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs" style={{ color: C.textSoft }}>{wine.anio}</span>
          <span className="text-sm font-medium" style={{ color: C.text }}>{formatPrice(wine.precio)}</span>
        </div>
      </div>
    </button>
  );
}
