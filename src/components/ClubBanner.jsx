import { BadgeCheck } from "lucide-react";
import { serif } from "../theme.js";
import { WINES } from "../data/wines.js";
import WineOfMonthCard from "./WineOfMonthCard.jsx";
import banner from "../img/club-banner.png";

const CLUB_WINES = [1, 15, 23];

export default function ClubBanner({ onOpen, onOpenWine }) {
  const clubWines = CLUB_WINES
    .map((id) => WINES.find((w) => w.id === id))
    .filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Fondo: absoluto, se estira solo con el alto que defina el contenido */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(34,31,26,0.1) 0%, rgba(34,31,26,0.65) 100%), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Contenido: ahora en flujo normal, NO absolute -> define el alto real del section */}
      <div className="relative z-10 mx-auto w-[90%] md:w-[60%] py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-left">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(255,248,237,0.12)", border: "1px solid rgba(255,248,237,0.35)" }}
          >
            <BadgeCheck size={14} color="#FFF8ED" />
            <span className="text-xs" style={{ color: "#FFF8ED" }}>Coronel Suárez</span>
          </div>

          <p
            className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] md:leading-[0.95] mb-6 font-[200]"
            style={{ ...serif, color: "#FFF8ED" }}
          >
            Unite al Club del vino, <br />
            el punto de{" "}
            <span className="italic" style={{ color: "#e6d6bd" }}>encuentro</span> de <br />
            quienes{" "}
            <span className="italic" style={{ color: "#e6d6bd" }}>comparten</span> <br />
            nuestra{" "}
            <span className="italic" style={{ color: "#e6d6bd" }}>pasión.</span>
          </p>

          <p className="text-base md:text-lg mb-2 max-w-md" style={{ color: "#EDE7D8" }}>
            Una selección curada de vinos que armamos cada mes, pensada para socios que quieren descubrir algo distinto sin salir de casa.
          </p>

          <p className="text-sm italic mb-6" style={{ color: "#C9B79A" }}>
            Para los que disfrutan el vino, por los que lo eligen.
          </p>

          <button
            onClick={onOpen}
            className="club-btn px-6 py-3.5 rounded-md text-sm font-medium cursor-pointer"
          >
            Conocer más
          </button>

          <p className="text-xs mt-4" style={{ color: "#C9B79A" }}>
            Primera caja con 15% off. Cancelás cuando quieras.
          </p>
        </div>

        {/* Grid de vinos: en mobile, grande centrado arriba + 2 chicas centradas abajo en fila */}
        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-4 w-full md:w-auto md:h-[460px]">
          <div className="md:h-full">
            {clubWines[0] && (
              <WineOfMonthCard wine={clubWines[0]} size="lg" fill onOpen={onOpenWine} />
            )}
          </div>
          <div className="flex flex-row justify-center gap-4 md:flex-col md:h-full md:justify-between">
            {clubWines[1] && <WineOfMonthCard wine={clubWines[1]} size="sm" onOpen={onOpenWine} />}
            {clubWines[2] && <WineOfMonthCard wine={clubWines[2]} size="sm" onOpen={onOpenWine} />}
          </div>
        </div>
      </div>
    </section>
  );
}