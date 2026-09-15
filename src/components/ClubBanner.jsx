import { serif } from "../theme.js";
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
      <div className="mx-auto w-[90%] md:w-[70%] pb-8 flex items-center justify-between gap-4" style={{ marginBottom: '2rem', fontSize: '15rem'}}>
        <div>
          <p className="text-4xl md:text-5xl mb-2" style={{ ...serif, color: "#FFF8ED" }}>
            El Club del Vino
          </p>
          <p className="text-base md:text-lg" style={{ color: "#EDE7D8" }}>
            Una caja curada cada mes, para socios.
          </p>
        </div>
        <button
          onClick={onOpen}
          className="club-btn shrink-0 px-6 py-3 rounded-md text-sm font-medium cursor-pointer"
        >
          Conocer más
        </button>
      </div>
    </section>
  );
}