import { ChevronLeft, ChevronRight } from "lucide-react";
import { C } from "../theme.js";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="p-2 rounded-md border disabled:opacity-40 cursor-pointer"
        style={{ borderColor: C.border }}
        aria-label="Página anterior"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className="w-9 h-9 rounded-md text-sm cursor-pointer"
          style={{
            background: n === page ? C.accent : "transparent",
            color: n === page ? "#FFF6F0" : C.text,
            border: n === page ? "none" : `1px solid ${C.border}`,
          }}
        >
          {n}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="p-2 rounded-md border disabled:opacity-40 cursor-pointer"
        style={{ borderColor: C.border }}
        aria-label="Página siguiente"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}