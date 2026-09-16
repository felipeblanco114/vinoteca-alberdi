import BottleIcon from "./BottleIcon.jsx";
import { C, serif } from "../theme.js";

const SIZES = {
  lg: { width: "w-60", imgPad: "py-10", bottle: 90, nameSize: "text-xl", pad: "p-5" },
  md: { width: "w-60", imgPad: "py-9", bottle: 72, nameSize: "text-lg", pad: "p-4" },
  sm: { width: "w-44", imgPad: "py-7", bottle: 58, nameSize: "text-base", pad: "p-3" },
};

export default function WineOfMonthCard({ wine, size = "md", fill = false, onOpen }) {
  const s = SIZES[size] ?? SIZES.md;

  return (
    <div
      className={`${s.width} rounded-lg overflow-hidden shadow-lg ${fill ? "h-full flex flex-col" : ""}`}
      style={{ background: C.card }}
    >
      <div
        className={`flex items-center justify-center ${s.imgPad} ${fill ? "flex-1" : ""}`}
        style={{ background: "#F3EFE4" }}
      >
        <BottleIcon tipo={wine.tipo} size={s.bottle} />
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
    </div>
  );
}