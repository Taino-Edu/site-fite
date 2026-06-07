import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <Dumbbell className="text-green-500" size={20} />
            <span>Site<span className="text-green-500">Fite</span></span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Conteúdo fitness de qualidade para transformar seu corpo e sua mente.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-zinc-300 mb-3">Navegação</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><Link to="/catalogo" className="hover:text-white transition-colors">Catálogo</Link></li>
            <li><Link to="/auth"     className="hover:text-white transition-colors">Minha conta</Link></li>
            <li><Link to="/"         className="hover:text-white transition-colors">Sobre nós</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-zinc-300 mb-3">Suporte</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Política de privacidade</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800 text-center text-xs text-zinc-600 py-4">
        © {new Date().getFullYear()} SiteFite. Todos os direitos reservados.
      </div>
    </footer>
  );
}
