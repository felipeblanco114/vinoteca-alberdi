const PALETTE = {
  Tinto: { glass: "#4A1620", cap: "#6B2737" },
  Blanco: { glass: "#5C6B2E", cap: "#8A9A46" },
  Rosado: { glass: "#D98CA0", cap: "#B8607A" },
  Espumante: { glass: "#2E4B3C", cap: "#C9A227" },
};

export default function BottleIcon({ tipo, size = 96 }) {
  const palette = PALETTE[tipo] || PALETTE.Tinto;

  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 60 102" aria-hidden="true">
      <rect x="26" y="0" width="8" height="16" rx="1" fill={palette.cap} />
      <rect x="24" y="14" width="12" height="10" fill={palette.glass} />
      <path
        d="M20 24 L40 24 L40 30 Q40 34 44 38 L44 96 Q44 100 40 100 L20 100 Q16 100 16 96 L16 38 Q20 34 20 30 Z"
        fill={palette.glass}
      />
      <rect x="14" y="58" width="32" height="26" rx="1" fill="#FBF8F0" opacity="0.95" />
      <rect x="17" y="62" width="26" height="1.5" fill={palette.glass} opacity="0.5" />
      <rect x="17" y="67" width="18" height="3" fill={palette.glass} opacity="0.8" />
      <rect x="17" y="76" width="22" height="1.5" fill={palette.glass} opacity="0.5" />
    </svg>
  );
}
