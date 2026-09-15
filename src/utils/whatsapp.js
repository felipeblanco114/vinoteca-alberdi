import { formatPrice } from "./format.js";

export function buildOrderMessage(items, delivery, total) {
  const lines = items.map(
    ({ wine, qty }) => `- ${qty}x ${wine.nombre} (${wine.bodega}) — ${formatPrice(wine.precio * qty)}`
  );

  const entrega = delivery.tipo === "retiro" ? "De Coronel Suárez" : `Envío a ${delivery.localidad}`;

  const message = [
    "Hola! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    `${entrega}`,
    `Dirección: ${delivery.direccion}`,
    `A nombre de: ${delivery.nombre}`,
  ].join("\n");

  return message;
}

export function buildWhatsAppUrl(phone, message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}