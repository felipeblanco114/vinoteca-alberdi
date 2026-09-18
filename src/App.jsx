import { useState, useEffect, useMemo } from "react";
import { C } from "./theme.js";
import { WINES } from "./data/wines.js";
import Header from "./components/Header.jsx";
import FilterBar from "./components/FilterBar.jsx";
import WineGrid from "./components/WineGrid.jsx";
import Pagination from "./components/Pagination.jsx";
import WineDetail from "./components/WineDetail.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import ClubModal from "./components/ClubModal.jsx";
import ClubBanner from "./components/ClubBanner.jsx";

const PAGE_SIZE = 10;
const PRECIOS = WINES.map((w) => w.precio);
const PRICE_MIN = Math.min(...PRECIOS);
const PRICE_MAX = Math.max(...PRECIOS);

export default function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ bodega: "", tipo: "", provincia: "", precioMax: PRICE_MAX });
  const [page, setPage] = useState(1);
  const [selectedWine, setSelectedWine] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [clubOpen, setClubOpen] = useState(false);
  const [delivery, setDelivery] = useState({ tipo: "retiro", localidad: "", direccion: "", nombre: "" });

  const options = useMemo(() => ({
    bodega: [...new Set(WINES.map((w) => w.bodega))].sort(),
    tipo: [...new Set(WINES.map((w) => w.tipo))],
    provincia: [...new Set(WINES.map((w) => w.provincia))].sort(),
  }), []);

  const filtered = useMemo(() => {
    return WINES.filter((w) => {
      const q = query.trim().toLowerCase();
      if (q && !(w.nombre.toLowerCase().includes(q) || w.bodega.toLowerCase().includes(q))) return false;
      if (filters.bodega && w.bodega !== filters.bodega) return false;
      if (filters.tipo && w.tipo !== filters.tipo) return false;
      if (filters.provincia && w.provincia !== filters.provincia) return false;
      if (w.precio > filters.precioMax) return false;
      return true;
    });
  }, [query, filters]);

  // Volver a la página 1 cada vez que cambia la búsqueda o los filtros.
  useEffect(() => {
    setPage(1);
  }, [query, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

  function clearCart() {
    setCart([]);
  }

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <ClubBanner onOpen={() => setClubOpen(true)} onOpenWine={setSelectedWine} />

      <main className="mx-auto w-full lg:w-[70%] px-4 pt-8 pb-8">
        <FilterBar
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          options={options}
          priceMin={PRICE_MIN}
          priceMax={PRICE_MAX}
          resultCount={filtered.length}
          onReset={() => { setQuery(""); setFilters({ bodega: "", tipo: "", provincia: "", precioMax: PRICE_MAX }); }}
        />

        <WineGrid wines={paginated} onOpen={setSelectedWine} />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
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
          onClear={clearCart}
          delivery={delivery}
          setDelivery={setDelivery}
        />
      )}

      {clubOpen && <ClubModal onClose={() => setClubOpen(false)} />}
    </div>
  );
}