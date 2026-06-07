import { ShoppingCart, User, Menu, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Dumbbell className="text-green-500" size={24} />
          <span>Site<span className="text-green-500">Fite</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link to="/catalogo" className="hover:text-white transition-colors">Catálogo</Link>
          <Link to="/catalogo" className="hover:text-white transition-colors">Planos</Link>
          <Link to="/catalogo" className="hover:text-white transition-colors">Sobre</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/carrinho"
            className="relative p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-0.5 -right-0.5 bg-green-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          <Link
            to="/auth"
            className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <User size={16} />
            Entrar
          </Link>
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 flex flex-col gap-4 text-sm font-medium text-zinc-400">
          <Link to="/catalogo" onClick={() => setMenuOpen(false)} className="hover:text-white">Catálogo</Link>
          <Link to="/catalogo" onClick={() => setMenuOpen(false)} className="hover:text-white">Planos</Link>
          <Link to="/auth"     onClick={() => setMenuOpen(false)} className="text-green-500 font-semibold">Entrar</Link>
        </div>
      )}
    </header>
  );
}
