import { ShoppingBag } from "lucide-react";
import { C } from "../theme.js";
import { useScrolled } from "../hooks/useScrolled.js";
import logo from "../img/ja-logo.png";

export default function Header({ cartCount, onCartClick }) {
  const scrolled = useScrolled();

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
      style={{
        background: scrolled ? C.headerScrolled : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      }}
    >
      <div className="w-full px-6 md:px-12 py-5 md:py-7 flex items-center justify-between">
        <img src={logo} alt="Vinoteca Alberdi" className="h-11 md:h-16" />
        <button onClick={onCartClick} className="relative p-2" aria-label="Ver carrito">
          <ShoppingBag
            size={24}
            color={scrolled ? C.headerScrolledText : "#FFF8ED"}
            className="transition-colors duration-300 md:scale-125"
          />
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center"
              style={{ background: C.accent, color: "#FFF6F0" }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}