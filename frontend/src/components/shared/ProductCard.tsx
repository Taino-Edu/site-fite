import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  nome: string;
  categoria: string;
  precoOriginal: number;
  precoPix: number;
  parcelas: number;
  valorParcela: number;
  avaliacao: number;
  totalAvaliacoes: number;
  badge?: string;
  emoji: string;
}

export default function ProductCard({ p }: { p: Product }) {
  const desconto = Math.round(((p.precoOriginal - p.precoPix) / p.precoOriginal) * 100);

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500/40 hover:shadow-lg hover:shadow-green-950/30 transition-all duration-200 flex flex-col">
      {/* Imagem */}
      <Link to={`/produto/${p.id}`} className="relative block">
        {p.badge && (
          <span className="absolute top-3 left-3 z-10 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {p.badge}
          </span>
        )}
        {desconto > 0 && (
          <span className="absolute top-3 right-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{desconto}%
          </span>
        )}
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 h-52 flex items-center justify-center group-hover:from-zinc-700 transition-colors">
          <span className="text-6xl select-none">{p.emoji}</span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-semibold text-green-500 uppercase tracking-widest mb-1">
          {p.categoria}
        </span>

        <Link to={`/produto/${p.id}`} className="font-medium text-zinc-100 text-sm leading-snug mb-2 hover:text-green-400 transition-colors line-clamp-2">
          {p.nome}
        </Link>

        {/* Avaliações */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < Math.floor(p.avaliacao) ? "text-yellow-400 fill-yellow-400" : "text-zinc-700 fill-zinc-700"}
            />
          ))}
          <span className="text-[11px] text-zinc-500 ml-1">({p.totalAvaliacoes})</span>
        </div>

        {/* Preços */}
        <div className="mt-auto">
          {p.precoOriginal > p.precoPix && (
            <p className="text-zinc-500 text-xs line-through mb-0.5">
              R$ {p.precoOriginal.toFixed(2).replace(".", ",")}
            </p>
          )}
          <div className="flex items-baseline gap-1.5 mb-0.5">
            <span className="text-xl font-bold text-white">
              R$ {p.precoPix.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <p className="text-[11px] text-green-400 font-medium mb-1">
            à vista no <span className="font-bold">Pix</span> com desconto
          </p>
          <p className="text-[11px] text-zinc-500 mb-4">
            ou {p.parcelas}x de R$ {p.valorParcela.toFixed(2).replace(".", ",")} sem juros
          </p>

          <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 active:bg-green-600 text-black text-sm font-bold py-2.5 rounded-xl transition-colors">
            <ShoppingCart size={15} />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
