import { X } from "lucide-react";
import { useModalEffects } from "../hooks/useModalEffects.js";
import { useDismiss } from "../hooks/useDismiss.js";
import illustration from "../img/club-illustration2.png";

export default function ClubModal({ onClose }) {
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
        className={`w-full max-w-sm max-h-[92vh] overflow-y-auto rounded-2xl px-8 py-8 text-center ${closing ? "animate-modal-out" : "animate-modal-in"}`}
        style={{ background: "#FFFFFF" }}
      >
        <div className="flex justify-end -mt-2 -mr-2 mb-2">
          <button onClick={dismiss} aria-label="Cerrar">
            <X size={20} color="#111111" />
          </button>
        </div>

        <h2
          className="text-5xl leading-[0.9] mb-6"
          style={{ fontFamily: "'argent-cf', Georgia, serif", fontWeight: 800, color: "#111111" }}
        >
          Unite al<br />Club del Vino
        </h2>

        <div className="flex justify-center mb-6">
          <img src={illustration} alt="Club del Vino" className="w-48 h-auto" />
        </div>

        <p className="text-sm leading-relaxed mb-8" style={{ color: "#333333" }}>
          Una selección curada de dos, cuatro o seis vinos únicos, entregada cada mes en tu puerta. Elegí la membresía que más te guste y decidí cuándo arrancar.
        </p>

        <button
          onClick={dismiss}
          className="px-8 py-3 rounded-full text-xs font-medium tracking-widest uppercase cursor-pointer"
          style={{ border: "1.5px solid #111111", color: "#111111", background: "transparent" }}
        >
          Empezar hoy
        </button>
      </div>
    </div>
  );
}