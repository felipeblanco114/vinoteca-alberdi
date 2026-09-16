import BottleIcon from "./BottleIcon.jsx";
import { C, serif } from "../theme.js";

const SIZES = {
  lg: { width: "w-64 sm:w-72 md:w-60", imgH: "h-56 sm:h-64", bottle: 90, nameSize: "text-xl", pad: "p-5" },
  md: { width: "w-full md:w-60", imgH: "h-48 md:h-56", bottle: 72, nameSize: "text-lg", pad: "p-4" },
  sm: { width: "w-32 sm:w-36 md:w-44", imgH: "h-28 sm:h-32 md:h-40", bottle: 58, nameSize: "text-base", pad: "p-3" },
};

export default function WineOfMonthCard({ wine, size = "md", fill = false, onOpen }) {
  const s = SIZES[size] ?? SIZES.md;

  return (
    <button
      onClick={() => onOpen(wine)}
      className={`${s.width} text-left rounded-lg overflow-hidden shadow-lg cursor-pointer ${fill ? "h-full flex flex-col" : ""}`}
      style={{ background: C.card }}
    >
      <div
        className={`flex items-center justify-center overflow-hidden ${fill ? "flex-1" : s.imgH}`}
        style={{ background: "#F3EFE4" }}
      >
        {wine.imagen ? (
          <img src={wine.imagen} alt={wine.nombre} className="w-full h-full object-cover" />
        ) : (
          <BottleIcon tipo={wine.tipo} size={s.bottle} />
        )}
      </div>
      <div className={s.pad}>
        <p className={`${s.nameSize} leading-snug mb-1`} style={{ ...serif, color: C.text }}>
          {wine.nombre}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: C.textSoft }}>
            {wine.anio} · {wine.bodega}
          </span>
        </div>
      </div>
    </button>
  );
}