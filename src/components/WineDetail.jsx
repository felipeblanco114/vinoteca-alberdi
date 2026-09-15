import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import BottleIcon from "./BottleIcon.jsx";
import { C, serif } from "../theme.js";
import { formatPrice } from "../utils/format.js";
import { useModalEffects } from "../hooks/useModalEffects.js";
import { useDismiss } from "../hooks/useDismiss.js";

export default function WineDetail({ wine, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const { closing, dismiss } = useDismiss(onClose);
  useModalEffects(dismiss);

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
      style={{ background: "rgba(34,31,26,0.5)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full sm:max-w-md max-h-[88vh] flex flex-col rounded-xl overflow-hidden ${closing ? "animate-modal-out" : "animate-modal-in"}`}
        style={{ background: C.card }}
      >
        <div className="shrink-0 flex justify-end p-2 border-b" style={{ borderColor: C.border }}>
          <button onClick={dismiss} aria-label="Cerrar" className="p-1">
            <X size={20} color={C.textSoft} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center py-8" style={{ background: "#F3EFE4" }}>
            <BottleIcon tipo={wine.tipo} size={130} />
          </div>
          <div className="p-5">
            <p className="text-sm mb-1" style={{ color: C.textSoft }}>{wine.bodega}</p>
            <h2 className="text-2xl mb-3" style={{ ...serif, color: C.text }}>{wine.nombre}</h2>
            <p className="text-sm mb-4" style={{ color: C.textSoft }}>{wine.notas}</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["Añada", wine.anio],
                ["Provincia", wine.provincia],
                ["Tipo", wine.tipo],
                ["Formato", "750ml"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border p-2" style={{ borderColor: C.border }}>
                  <p className="text-xs" style={{ color: C.textSoft }}>{label}</p>
                  <p className="text-sm" style={{ color: C.text }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 p-4 border-t" style={{ borderColor: C.border, background: C.card }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl" style={{ ...serif, color: C.text }}>{formatPrice(wine.precio)}</span>
            <div className="flex items-center gap-3 border rounded-md px-2 py-1" style={{ borderColor: C.border }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Restar"><Minus size={14} /></button>
              <span className="text-sm w-4 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Sumar"><Plus size={14} /></button>
            </div>
          </div>
          <button
            onClick={() => { onAdd(wine, qty); onClose(); }}
            className="w-full py-3 rounded-md text-sm font-medium"
            style={{ background: C.accent, color: "#FFF6F0" }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}