import { X, Wine as WineIcon } from "lucide-react";
import { C, serif } from "../theme.js";
import { useModalEffects } from "../hooks/useModalEffects.js";
import { useDismiss } from "../hooks/useDismiss.js";

export default function ClubModal({ onClose }) {
  const { closing, dismiss } = useDismiss(onClose);
  useModalEffects(dismiss);

  return (
    <div onClick={dismiss} className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${closing ? "animate-fade-out" : "animate-fade-in"}`} style={{ background: "rgba(34,31,26,0.5)" }}>
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-sm rounded-lg p-6 ${closing ? "animate-modal-out" : "animate-modal-in"}`} style={{ background: C.card }}>
        <div className="flex justify-end">
          <button onClick={dismiss} aria-label="Cerrar"><X size={20} color={C.textSoft} /></button>
        </div>
        <div className="flex justify-center mb-4">
          <WineIcon size={32} color={C.accent} />
        </div>
        <h2 className="text-xl text-center mb-2" style={{ ...serif, color: C.text }}>Club del Vino Alberdi</h2>
        <p className="text-sm text-center" style={{ color: C.textSoft }}>
          Socios reciben una caja curada cada mes, con notas de cata y descuentos exclusivos en la vinoteca. Muy pronto vas a poder sumarte desde acá.
        </p>
      </div>
    </div>
  );
}