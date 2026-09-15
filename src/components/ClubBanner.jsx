import { C, serif } from "../theme.js";
import banner from "../img/club-banner.png";

export default function ClubBanner({ onOpen }) {
  return (
    <section
      className="relative w-full flex items-end"
      style={{
        height: "460px",
        backgroundImage: `linear-gradient(180deg, rgba(34,31,26,0.1) 0%, rgba(34,31,26,0.65) 100%), url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full px-6 md:px-10 pb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-2xl md:text-3xl mb-1" style={{ ...serif, color: "#FFF8ED" }}>
            El Club del Vino
          </p>
          <p className="text-sm" style={{ color: "#EDE7D8" }}>
            Una caja curada cada mes, para socios.
          </p>
        </div>
        <button
          onClick={onOpen}
          className="shrink-0 px-5 py-3 rounded-md text-sm font-medium cursor-pointer"
          style={{ background: C.accent, color: "#FFF6F0" }}
        >
          Conocer más
        </button>
      </div>
    </section>
  );
}