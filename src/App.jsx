import { useState, useMemo } from "react";
import { C } from "./theme.js";
import { WINES } from "./data/wines.js";
import Header from "./components/Header.jsx";
import FilterBar from "./components/FilterBar.jsx";
import WineGrid from "./components/WineGrid.jsx";
import WineDetail from "./components/WineDetail.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import ClubModal from "./components/ClubModal.jsx";
import { serif } from "./theme.js";
import ClubBanner from "./components/ClubBanner.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ bodega: "", tipo: "", provincia: "", precio: "" });
  const [selectedWine, setSelectedWine] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [clubOpen, setClubOpen] = useState(false);
  const [delivery, setDelivery] = useState({ tipo: "retiro", localidad: "", direccion: "", nombre: "" });

  const options = useMemo(() => ({
    bodega: [...new Set(WINES.map((w) => w.bodega))].sort(),
    tipo: [...new Set(WINES.map((w) => w.tipo))],
    provincia: [...new Set(WINES.map((w) => w.provincia))].sort(),
    precio: ["15000", "25000", "35000", "50000"],
  }), []);

  const filtered = useMemo(() => {
    return WINES.filter((w) => {
      const q = query.trim().toLowerCase();
      if (q && !(w.nombre.toLowerCase().includes(q) || w.bodega.toLowerCase().includes(q))) return false;
      if (filters.bodega && w.bodega !== filters.bodega) return false;
      if (filters.tipo && w.tipo !== filters.tipo) return false;
      if (filters.provincia && w.provincia !== filters.provincia) return false;
      if (filters.precio && w.precio > Number(filters.precio)) return false;
      return true;
    });
  }, [query, filters]);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  function addToCart(wine, qty) {
    setCart((prev) => {
      const existing = prev.find((i) => i.wine.id === wine.id);
      if (existing) {
        return prev.map((i) => (i.wine.id === wine.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { wine, qty }];
    });
  }

  function changeQty(id, qty) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.wine.id !== id);
      return prev.map((i) => (i.wine.id === id ? { ...i, qty } : i));
    });
  }

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <ClubBanner onOpen={() => setClubOpen(true)} />

      <main className="mx-auto w-full lg:w-[70%] px-4 pt-8 pb-8">
        <FilterBar
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          options={options}
          resultCount={filtered.length}
          onReset={() => { setQuery(""); setFilters({ bodega: "", tipo: "", provincia: "", precio: "" }); }}
        />

        <WineGrid wines={filtered} onOpen={setSelectedWine} />

        {/* <button
          onClick={() => setClubOpen(true)}
          className="w-full rounded-lg p-5 flex items-center justify-between text-left"
          style={{ background: C.accentSoft, border: `1px solid ${C.border}` }}
        >
          <div>
            <p className="text-lg" style={{ ...serif, color: C.text }}>El Club del Vino</p>
            <p className="text-sm" style={{ color: C.textSoft }}>Una caja curada cada mes, para socios.</p>
          </div>
          <span className="text-sm underline" style={{ color: C.accent }}>Conocer más</span>
        </button> */}
      </main>

      <footer className="text-center text-xs text-ink-soft py-8 px-6">
        © 2026 JA! · Todos los derechos reservados · Desarrollado por Felipe Blanco Muzzolón
      </footer>

      {selectedWine && (
        <WineDetail wine={selectedWine} onClose={() => setSelectedWine(null)} onAdd={addToCart} />
      )}

      {cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onQtyChange={changeQty}
          delivery={delivery}
          setDelivery={setDelivery}
        />
      )}

      {clubOpen && <ClubModal onClose={() => setClubOpen(false)} />} 
    </div>
  );
}
