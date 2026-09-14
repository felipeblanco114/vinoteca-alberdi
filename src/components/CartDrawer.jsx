import { X, MapPin, Minus, Plus } from "lucide-react";
import BottleIcon from "./BottleIcon.jsx";
import { C, serif } from "../theme.js";
import { formatPrice } from "../utils/format.js";
import { buildOrderMessage, buildWhatsAppUrl } from "../utils/whatsapp.js";
import { WHATSAPP_NUMBER } from "../config.js";

export default function CartDrawer({ items, onClose, onQtyChange, delivery, setDelivery }) {
  const total = items.reduce((sum, i) => sum + i.wine.precio * i.qty, 0);
  const canCheckout =
    items.length > 0 &&
    delivery.direccion.trim() &&
    delivery.nombre.trim() &&
    (delivery.tipo === "retiro" || delivery.localidad.trim());

  function handleCheckout() {
    const message = buildOrderMessage(items, delivery, total);
    const url = buildWhatsAppUrl(WHATSAPP_NUMBER, message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(34,31,26,0.5)" }}>
      <div className="w-full max-w-sm h-full flex flex-col" style={{ background: C.card }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: C.border }}>
          <h2 className="text-lg" style={{ ...serif, color: C.text }}>Tu pedido</h2>
          <button onClick={onClose} aria-label="Cerrar"><X size={20} color={C.textSoft} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 && (
            <p className="text-sm" style={{ color: C.textSoft }}>Todavía no agregaste vinos.</p>
          )}
          {items.map(({ wine, qty }) => (
            <div key={wine.id} className="flex items-center gap-3 mb-4">
              <BottleIcon tipo={wine.tipo} size={36} />
              <div className="flex-1">
                <p className="text-sm" style={{ color: C.text }}>{wine.nombre}</p>
                <p className="text-xs" style={{ color: C.textSoft }}>{wine.bodega}</p>
              </div>
              <div className="flex items-center gap-2 border rounded-md px-1" style={{ borderColor: C.border }}>
                <button onClick={() => onQtyChange(wine.id, qty - 1)} aria-label="Restar"><Minus size={12} /></button>
                <span className="text-xs w-3 text-center">{qty}</span>
                <button onClick={() => onQtyChange(wine.id, qty + 1)} aria-label="Sumar"><Plus size={12} /></button>
              </div>
              <span className="text-sm w-20 text-right" style={{ color: C.text }}>{formatPrice(wine.precio * qty)}</span>
            </div>
          ))}

          {items.length > 0 && (
            <div className="mt-6 pt-4 border-t" style={{ borderColor: C.border }}>
              <p className="text-sm font-medium mb-2" style={{ color: C.text }}>¿Cómo lo recibís?</p>
              <div className="flex gap-2 mb-3">
                {[
                  { key: "retiro", label: "Coronel Suárez" },
                  { key: "envio", label: "Otra localidad" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setDelivery((d) => ({ ...d, tipo: opt.key }))}
                    className="flex-1 text-xs py-2 rounded-md border"
                    style={{
                      borderColor: delivery.tipo === opt.key ? C.accent : C.border,
                      background: delivery.tipo === opt.key ? C.accentSoft : "white",
                      color: C.text,
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {delivery.tipo === "envio" && (
                  <div className="flex items-center gap-2 border rounded-md px-2 py-2" style={{ borderColor: C.border }}>
                    <MapPin size={14} color={C.textSoft} />
                    <input
                      placeholder="Localidad"
                      value={delivery.localidad}
                      onChange={(e) => setDelivery((d) => ({ ...d, localidad: e.target.value }))}
                      className="flex-1 text-sm outline-none"
                    />
                  </div>
                )}
                <input
                  placeholder="Dirección"
                  value={delivery.direccion}
                  onChange={(e) => setDelivery((d) => ({ ...d, direccion: e.target.value }))}
                  className="text-sm outline-none border rounded-md px-2 py-2"
                  style={{ borderColor: C.border }}
                />
                <input
                  placeholder="A nombre de"
                  value={delivery.nombre}
                  onChange={(e) => setDelivery((d) => ({ ...d, nombre: e.target.value }))}
                  className="text-sm outline-none border rounded-md px-2 py-2"
                  style={{ borderColor: C.border }}
                />
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t" style={{ borderColor: C.border }}>
            <div className="flex justify-between mb-3">
              <span className="text-sm" style={{ color: C.textSoft }}>Total</span>
              <span className="text-lg" style={{ ...serif, color: C.text }}>{formatPrice(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!canCheckout}
              className="w-full py-3 rounded-md text-sm font-medium"
              style={{ background: canCheckout ? C.accent : C.border, color: canCheckout ? "#FFF6F0" : C.textSoft }}
            >
              Confirmar por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}