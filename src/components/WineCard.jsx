import BottleIcon from "./BottleIcon.jsx";
import { C, serif } from "../theme.js";
import { formatPrice } from "../utils/format.js";

export default function WineCard({ wine, onOpen }) {
  return (
    <button
      onClick={() => onOpen(wine)}
      className="flex flex-col h-full w-full text-left rounded-lg overflow-hidden cursor-pointer transition-shadow duration-200 lg:hover:shadow-xl"
      style={{ background: C.card }}
    >
      <div
        className="shrink-0 flex items-center justify-center overflow-hidden aspect-[3/5]"
        style={{ background: wine.imagen ? "#FFFFFF" : "#F3EFE4" }}
      >
        {wine.imagen ? (
          <img src={wine.imagen} alt={wine.nombre} className="w-full h-full object-cover" />
        ) : (
          <BottleIcon tipo={wine.tipo} size={92} />
        )}
      </div>
      <div className="flex-1 flex flex-col p-4 lg:p-5">
        <p className="text-lg leading-snug" style={{ ...serif, color: C.text }}>{wine.nombre}</p>
        <p className="text-xs mt-1" style={{ color: C.textSoft }}>{wine.bodega}</p>
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-xs" style={{ color: C.textSoft }}>{wine.anio}</span>
          <span className="text-sm font-medium" style={{ color: C.text }}>{formatPrice(wine.precio)}</span>
        </div>
      </div>
    </button>
  );
}