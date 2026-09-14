import { ShoppingBag } from "lucide-react";
import { C } from "../theme.js";
import logo from "../img/ja-logo.png";

export default function Header({ cartCount, onCartClick }) {
  return (
    <header style={{ background: C.header }}>
      <div className="w-full px-6 md:px-10 py-5 flex items-center justify-between">
        <img src={logo} alt="Vinoteca Alberdi" className="h-11" />
        <button onClick={onCartClick} className="relative p-2" aria-label="Ver carrito">
          <ShoppingBag size={24} color={C.headerText} />
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