import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Search, LayoutGrid, LayoutList, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  marca: string;
  preco: number;
  precoOld: number;
  parcelas: number;
  valorParcela: number;
  stars: number;
  reviews: number;
  badge: string;
  emoji: string;
}

const produtos: Produto[] = [
  { id: 1,  nome: "Halter Hexagonal Borracha 2kg",              categoria: "Pesos e Halteres",  marca: "Head",    preco: 49.90,   precoOld: 69.90,   parcelas: 12, valorParcela: 4.67,  stars: 4.8, reviews: 214, badge: "",             emoji: "🏋️" },
  { id: 2,  nome: "Halter Hexagonal Borracha 5kg",              categoria: "Pesos e Halteres",  marca: "Head",    preco: 89.90,   precoOld: 119.90,  parcelas: 12, valorParcela: 8.41,  stars: 4.9, reviews: 312, badge: "Mais vendido",  emoji: "🏋️" },
  { id: 3,  nome: "Halter Hexagonal Borracha 10kg",             categoria: "Pesos e Halteres",  marca: "Head",    preco: 149.90,  precoOld: 189.90,  parcelas: 12, valorParcela: 14.02, stars: 4.7, reviews: 189, badge: "",             emoji: "🏋️" },
  { id: 4,  nome: "Halter Hexagonal Borracha 20kg",             categoria: "Pesos e Halteres",  marca: "Head",    preco: 279.90,  precoOld: 349.90,  parcelas: 12, valorParcela: 26.18, stars: 4.9, reviews: 98,  badge: "Oferta",       emoji: "🏋️" },
  { id: 5,  nome: "Kit Halteres Ajustáveis 32kg (par)",         categoria: "Pesos e Halteres",  marca: "Kikos",   preco: 899.90,  precoOld: 1199.90, parcelas: 12, valorParcela: 84.14, stars: 4.8, reviews: 76,  badge: "Novo",         emoji: "🔧" },
  { id: 6,  nome: "Barra Olímpica 20kg 2,20m Cromada",          categoria: "Barras e Anilhas",  marca: "Head",    preco: 549.90,  precoOld: 699.90,  parcelas: 12, valorParcela: 51.44, stars: 4.9, reviews: 143, badge: "",             emoji: "⚙️" },
  { id: 7,  nome: "Barra W EZ Rosca 10kg",                      categoria: "Barras e Anilhas",  marca: "Kikos",   preco: 219.90,  precoOld: 279.90,  parcelas: 12, valorParcela: 20.57, stars: 4.7, reviews: 88,  badge: "",             emoji: "⚙️" },
  { id: 8,  nome: "Anilha Olímpica Ferro Fundido 5kg",          categoria: "Barras e Anilhas",  marca: "Head",    preco: 79.90,   precoOld: 99.90,   parcelas: 12, valorParcela: 7.47,  stars: 4.8, reviews: 267, badge: "",             emoji: "⚫" },
  { id: 9,  nome: "Anilha Olímpica Ferro Fundido 10kg",         categoria: "Barras e Anilhas",  marca: "Head",    preco: 129.90,  precoOld: 159.90,  parcelas: 12, valorParcela: 12.15, stars: 4.7, reviews: 521, badge: "Mais vendido",  emoji: "⚫" },
  { id: 10, nome: "Anilha Olímpica Ferro Fundido 20kg",         categoria: "Barras e Anilhas",  marca: "Head",    preco: 229.90,  precoOld: 289.90,  parcelas: 12, valorParcela: 21.50, stars: 4.9, reviews: 312, badge: "",             emoji: "⚫" },
  { id: 11, nome: "Esteira Elétrica Dobrável 127v",             categoria: "Cardio",            marca: "Kikos",   preco: 2499.90, precoOld: 3199.90, parcelas: 12, valorParcela: 233.88,stars: 4.6, reviews: 45,  badge: "Oferta",       emoji: "🏃" },
  { id: 12, nome: "Bicicleta Ergométrica Vertical",             categoria: "Cardio",            marca: "Kikos",   preco: 1299.90, precoOld: 1699.90, parcelas: 12, valorParcela: 121.58,stars: 4.7, reviews: 91,  badge: "",             emoji: "🚴" },
  { id: 13, nome: "Rack de Agachamento Profissional",           categoria: "Racks e Gaiolas",   marca: "WCT",     preco: 1899.90, precoOld: 2399.90, parcelas: 12, valorParcela: 177.73,stars: 4.9, reviews: 38,  badge: "",             emoji: "🔩" },
  { id: 14, nome: "Power Rack Gaiola 4 Torres",                 categoria: "Racks e Gaiolas",   marca: "WCT",     preco: 3499.90, precoOld: 4299.90, parcelas: 12, valorParcela: 327.47,stars: 4.8, reviews: 22,  badge: "Novo",         emoji: "🏗️" },
  { id: 15, nome: "Banco Supino Regulável 6 posições",          categoria: "Bancos e Suportes", marca: "Kikos",   preco: 649.90,  precoOld: 849.90,  parcelas: 12, valorParcela: 60.79, stars: 4.8, reviews: 134, badge: "",             emoji: "🪑" },
  { id: 16, nome: "Banco Scott Rosca Concentrada",              categoria: "Bancos e Suportes", marca: "WCT",     preco: 499.90,  precoOld: 649.90,  parcelas: 12, valorParcela: 46.77, stars: 4.7, reviews: 67,  badge: "",             emoji: "🪑" },
  { id: 17, nome: "Luva de Treino Couro Pro",                   categoria: "Acessórios",        marca: "Head",    preco: 89.90,   precoOld: 119.90,  parcelas: 12, valorParcela: 8.41,  stars: 4.6, reviews: 402, badge: "",             emoji: "🧤" },
  { id: 18, nome: "Cinto Musculação Couro 4 Polegadas",         categoria: "Acessórios",        marca: "Head",    preco: 129.90,  precoOld: 169.90,  parcelas: 12, valorParcela: 12.15, stars: 4.8, reviews: 188, badge: "Mais vendido",  emoji: "🔲" },
];

const categorias   = ["Todos", "Pesos e Halteres", "Barras e Anilhas", "Cardio", "Racks e Gaiolas", "Bancos e Suportes", "Acessórios"];
const marcas       = ["Todas", "Head", "Kikos", "WCT"];
const faixasPreco  = [
  { label: "Até R$ 100",           min: 0,    max: 100    },
  { label: "R$ 100 a R$ 500",      min: 100,  max: 500    },
  { label: "R$ 500 a R$ 1.500",    min: 500,  max: 1500   },
  { label: "Acima de R$ 1.500",    min: 1500, max: Infinity },
];
const ordenacoes = ["Mais relevantes", "Menor preço", "Maior preço", "Melhor avaliação", "Mais vendidos"];

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-zinc-800 py-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-semibold text-zinc-200 mb-3">
        {title}
        {open ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
      </button>
      {open && children}
    </div>
  );
}

function CardProduto({ p }: { p: Produto }) {
  const desc = Math.round(((p.precoOld - p.preco) / p.precoOld) * 100);
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500/40 hover:shadow-lg hover:shadow-green-950/20 transition-all duration-200 flex flex-col">
      <Link to={`/produto/${p.id}`} className="relative block">
        {p.badge && (
          <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${p.badge === "Oferta" ? "bg-red-500 text-white" : p.badge === "Novo" ? "bg-blue-500 text-white" : "bg-green-500 text-black"}`}>
            {p.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{desc}%</span>
        <div className="bg-zinc-800 group-hover:bg-zinc-750 h-48 flex items-center justify-center transition-colors">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-200 select-none">{p.emoji}</span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1">{p.marca}</p>
        <Link to={`/produto/${p.id}`} className="text-sm font-medium text-zinc-100 group-hover:text-green-400 transition-colors line-clamp-2 mb-2 leading-snug">
          {p.nome}
        </Link>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className={i < Math.floor(p.stars) ? "text-yellow-400 fill-yellow-400" : "text-zinc-700 fill-zinc-700"} />
          ))}
          <span className="text-[11px] text-zinc-600 ml-1">({p.reviews})</span>
        </div>

        <div className="mt-auto">
          <p className="text-xs text-zinc-600 line-through">R$ {p.precoOld.toFixed(2).replace(".", ",")}</p>
          <p className="text-lg font-bold text-white leading-tight">R$ {p.preco.toFixed(2).replace(".", ",")}</p>
          <p className="text-[11px] text-green-400 font-medium mt-0.5">à vista no <strong>Pix</strong></p>
          <p className="text-[11px] text-zinc-500 mb-4">ou {p.parcelas}x de R$ {p.valorParcela.toFixed(2).replace(".", ",")}</p>

          <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 active:scale-95 text-black text-sm font-bold py-2.5 rounded-xl transition-all">
            <ShoppingCart size={14} />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [cat,     setCat]     = useState("Todos");
  const [marca,   setMarca]   = useState("Todas");
  const [faixa,   setFaixa]   = useState<number | null>(null);
  const [ordem,   setOrdem]   = useState("Mais relevantes");
  const [busca,   setBusca]   = useState("");
  const [drawer,  setDrawer]  = useState(false);
  const [cols,    setCols]    = useState<2 | 3>(3);

  const limpar = () => { setCat("Todos"); setMarca("Todas"); setFaixa(null); setBusca(""); };
  const temFiltro = cat !== "Todos" || marca !== "Todas" || faixa !== null || busca !== "";

  const lista = produtos
    .filter((p) => {
      const okCat   = cat   === "Todos"  || p.categoria === cat;
      const okMarca = marca === "Todas"  || p.marca     === marca;
      const f       = faixa !== null ? faixasPreco[faixa] : null;
      const okPreco = !f || (p.preco >= f.min && p.preco <= f.max);
      const okBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
      return okCat && okMarca && okPreco && okBusca;
    })
    .sort((a, b) => {
      if (ordem === "Menor preço")      return a.preco   - b.preco;
      if (ordem === "Maior preço")      return b.preco   - a.preco;
      if (ordem === "Melhor avaliação") return b.stars   - a.stars;
      if (ordem === "Mais vendidos")    return b.reviews - a.reviews;
      return 0;
    });

  const SidebarContent = () => (
    <div>
      <div className="relative mb-2">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text" placeholder="Buscar..."
          value={busca} onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-8 pr-8 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-green-500"
        />
        {busca && <button onClick={() => setBusca("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"><X size={12} /></button>}
      </div>

      <FilterSection title="Categoria">
        <ul className="space-y-1.5">
          {categorias.map((c) => (
            <li key={c}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input type="radio" name="cat" checked={cat === c} onChange={() => setCat(c)} className="accent-green-500" />
                <span className={`text-sm ${cat === c ? "text-green-400 font-medium" : "text-zinc-400 group-hover:text-white"} transition-colors`}>{c}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Marca">
        <ul className="space-y-1.5">
          {marcas.map((m) => (
            <li key={m}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input type="radio" name="marca" checked={marca === m} onChange={() => setMarca(m)} className="accent-green-500" />
                <span className={`text-sm ${marca === m ? "text-green-400 font-medium" : "text-zinc-400 group-hover:text-white"} transition-colors`}>{m}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Faixa de Preço">
        <ul className="space-y-1.5">
          {faixasPreco.map((f, i) => (
            <li key={f.label}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input type="radio" name="faixa" checked={faixa === i} onChange={() => setFaixa(faixa === i ? null : i)} className="accent-green-500" />
                <span className={`text-sm ${faixa === i ? "text-green-400 font-medium" : "text-zinc-400 group-hover:text-white"} transition-colors`}>{f.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Disponibilidade">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-green-500" />
          <span className="text-sm text-zinc-400 hover:text-white transition-colors">Em estoque</span>
        </label>
      </FilterSection>

      {temFiltro && (
        <button onClick={limpar} className="w-full mt-4 text-xs text-red-400 hover:text-red-300 flex items-center justify-center gap-1.5 py-2 border border-red-900/40 rounded-lg hover:bg-red-950/20 transition-colors">
          <X size={11} /> Limpar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <p className="text-xs text-zinc-600 mb-2">
        <Link to="/" className="hover:text-zinc-400 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{cat === "Todos" ? "Catálogo" : cat}</span>
      </p>
      <h1 className="text-2xl font-bold mb-6">{cat === "Todos" ? "Todos os produtos" : cat}</h1>

      {/* Banner cupom */}
      <div className="bg-green-950/40 border border-green-900/50 rounded-xl px-5 py-3 mb-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-zinc-300">
          🎉 Primeira compra? Use <span className="font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded mx-1">BEMVINDO10</span> e ganhe <strong>10% off</strong>
        </p>
        <button className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors whitespace-nowrap">Fechar</button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Filtros</p>
          <SidebarContent />
        </aside>

        {/* Drawer mobile */}
        {drawer && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-black/75" onClick={() => setDrawer(false)} />
            <div className="relative bg-zinc-950 border-r border-zinc-800 w-72 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <p className="font-bold text-white">Filtros</p>
                <button onClick={() => setDrawer(false)} className="text-zinc-500 hover:text-white"><X size={18} /></button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <button onClick={() => setDrawer(true)} className="lg:hidden flex items-center gap-2 border border-zinc-700 text-zinc-400 hover:text-white text-sm px-3 py-2 rounded-lg transition-colors">
                <SlidersHorizontal size={14} /> Filtros
              </button>
              <p className="text-sm text-zinc-500">
                <span className="text-white font-semibold">{lista.length}</span> produtos
                {temFiltro && <span className="text-green-500 ml-1">filtrados</span>}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex border border-zinc-800 rounded-lg overflow-hidden">
                <button onClick={() => setCols(3)} className={`p-2 transition-colors ${cols === 3 ? "bg-zinc-800 text-white" : "text-zinc-600 hover:text-zinc-400"}`}><LayoutGrid size={15} /></button>
                <button onClick={() => setCols(2)} className={`p-2 transition-colors ${cols === 2 ? "bg-zinc-800 text-white" : "text-zinc-600 hover:text-zinc-400"}`}><LayoutList size={15} /></button>
              </div>
              <select value={ordem} onChange={(e) => setOrdem(e.target.value)} className="bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500 cursor-pointer">
                {ordenacoes.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Tags ativas */}
          {temFiltro && (
            <div className="flex flex-wrap gap-2 mb-5">
              {cat !== "Todos" && <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full">{cat} <button onClick={() => setCat("Todos")}><X size={10} /></button></span>}
              {marca !== "Todas" && <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full">{marca} <button onClick={() => setMarca("Todas")}><X size={10} /></button></span>}
              {faixa !== null && <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full">{faixasPreco[faixa].label} <button onClick={() => setFaixa(null)}><X size={10} /></button></span>}
              {busca && <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full">"{busca}" <button onClick={() => setBusca("")}><X size={10} /></button></span>}
            </div>
          )}

          {/* Grid */}
          {lista.length === 0 ? (
            <div className="text-center py-24 text-zinc-600">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-semibold text-zinc-400 text-lg">Nenhum produto encontrado</p>
              <p className="text-sm mt-1 mb-4">Tente ajustar ou limpar os filtros</p>
              <button onClick={limpar} className="text-green-500 hover:text-green-400 text-sm underline">Limpar filtros</button>
            </div>
          ) : (
            <div className={`grid gap-4 ${cols === 3 ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
              {lista.map((p) => <CardProduto key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
