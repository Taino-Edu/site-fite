import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, CreditCard, Headphones, Star, ChevronRight } from "lucide-react";

const categorias = [
  { nome: "Pesos e Halteres",    slug: "pesos-halteres",   emoji: "🏋️",  count: 48 },
  { nome: "Barras e Anilhas",    slug: "barras-anilhas",   emoji: "💪",  count: 35 },
  { nome: "Cardio",              slug: "cardio",            emoji: "🏃",  count: 22 },
  { nome: "Racks e Gaiolas",    slug: "racks",             emoji: "🔩",  count: 17 },
  { nome: "Bancos e Suportes",  slug: "bancos",            emoji: "🪑",  count: 29 },
  { nome: "Acessórios",         slug: "acessorios",        emoji: "🧢",  count: 61 },
];

const destaques = [
  { id: 1,  nome: "Halter Hexagonal Borracha 20kg",     preco: 189.90, precoOld: 239.90, parcelas: 12, porcela: 17.75, emoji: "🏋️", badge: "Mais vendido", stars: 4.9, reviews: 312 },
  { id: 2,  nome: "Barra Olímpica 20kg 2,20m Cromada",  preco: 549.90, precoOld: 699.90, parcelas: 12, porcela: 51.41, emoji: "💪", badge: "Oferta",       stars: 4.8, reviews: 189 },
  { id: 3,  nome: "Anilha Olímpica Ferro Fundido 10kg", preco: 129.90, precoOld: 159.90, parcelas: 12, porcela: 12.15, emoji: "⚫", badge: "",             stars: 4.7, reviews: 521 },
  { id: 4,  nome: "Kit Halteres Ajustáveis 32kg",       preco: 899.90, precoOld: 1199.90,parcelas: 12, porcela: 84.14, emoji: "🔧", badge: "Novo",         stars: 4.9, reviews: 98  },
];

const beneficios = [
  { icon: Truck,       titulo: "Frete Grátis",        desc: "Em compras acima de R$ 399" },
  { icon: ShieldCheck, titulo: "Garantia de 1 ano",   desc: "Em todos os produtos" },
  { icon: CreditCard,  titulo: "12x sem juros",        desc: "Nos principais cartões" },
  { icon: Headphones,  titulo: "Suporte especializado", desc: "Seg a Sáb, 8h às 20h" },
];

const banners = [
  { titulo: "Kit Iniciante",         desc: "Monte sua academia em casa a partir de R$ 299",  cor: "from-blue-950 to-zinc-900",   emoji: "🏠" },
  { titulo: "Cardio em Casa",        desc: "Esteiras e bikes com até 30% off este mês",       cor: "from-purple-950 to-zinc-900", emoji: "🏃" },
];

export default function Home() {
  return (
    <div>
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#14532d55,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide">
              Equipamentos profissionais · Entrega em todo Brasil
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-5">
              Sua academia,<br />
              <span className="text-green-500">do seu jeito</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-md">
              Halteres, barras, anilhas, racks e muito mais. Equipamentos de qualidade profissional para montar a academia que você sempre quis.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3.5 rounded-xl transition-colors"
              >
                Ver produtos <ArrowRight size={16} />
              </Link>
              <Link
                to="/catalogo"
                className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                Ver ofertas
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-10 text-sm text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-zinc-300 font-medium">4.9</span>&nbsp;avaliação média
              </div>
              <div className="w-px h-4 bg-zinc-800" />
              <span><span className="text-zinc-300 font-medium">+12.000</span> clientes</span>
              <div className="w-px h-4 bg-zinc-800" />
              <span><span className="text-zinc-300 font-medium">+200</span> produtos</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {["🏋️", "💪", "⚫", "🔧"].map((e, i) => (
              <div
                key={i}
                className={`bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-6xl h-36 ${i === 1 ? "mt-6" : ""} ${i === 3 ? "-mt-6" : ""}`}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFÍCIOS ──────────────────────────────────── */}
      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {beneficios.map(({ icon: Icon, titulo, desc }) => (
            <div key={titulo} className="flex items-center gap-3 py-2">
              <div className="bg-green-500/10 p-2.5 rounded-lg flex-shrink-0">
                <Icon size={18} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{titulo}</p>
                <p className="text-xs text-zinc-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIAS ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-7">
          <h2 className="text-2xl font-bold">Comprar por categoria</h2>
          <Link to="/catalogo" className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center gap-1">
            Ver todas <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              to={`/catalogo?categoria=${c.slug}`}
              className="group bg-zinc-900 border border-zinc-800 hover:border-green-500/40 rounded-2xl p-4 flex flex-col items-center text-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <span className="text-4xl">{c.emoji}</span>
              <p className="text-sm font-medium text-zinc-200 group-hover:text-green-400 transition-colors leading-snug">{c.nome}</p>
              <p className="text-xs text-zinc-600">{c.count} produtos</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BANNERS DUPLOS ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-14 grid md:grid-cols-2 gap-4">
        {banners.map((b) => (
          <Link
            key={b.titulo}
            to="/catalogo"
            className={`group relative overflow-hidden bg-gradient-to-r ${b.cor} border border-zinc-800 hover:border-zinc-700 rounded-2xl p-8 flex items-center justify-between transition-all`}
          >
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">Destaque</p>
              <h3 className="text-xl font-bold text-white mb-1">{b.titulo}</h3>
              <p className="text-zinc-400 text-sm max-w-xs">{b.desc}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-green-400 group-hover:gap-2 transition-all">
                Comprar agora <ArrowRight size={14} />
              </span>
            </div>
            <span className="text-7xl opacity-60 group-hover:scale-110 transition-transform">{b.emoji}</span>
          </Link>
        ))}
      </section>

      {/* ── PRODUTOS DESTAQUE ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="text-2xl font-bold">Mais vendidos</h2>
            <p className="text-zinc-500 text-sm mt-1">Os favoritos de quem treina de verdade</p>
          </div>
          <Link to="/catalogo" className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center gap-1">
            Ver todos <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destaques.map((p) => {
            const desc = Math.round(((p.precoOld - p.preco) / p.precoOld) * 100);
            return (
              <Link
                key={p.id}
                to={`/produto/${p.id}`}
                className="group bg-zinc-900 border border-zinc-800 hover:border-green-500/40 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-green-950/20 flex flex-col"
              >
                <div className="relative bg-zinc-800 h-48 flex items-center justify-center">
                  {p.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${p.badge === "Oferta" ? "bg-red-500 text-white" : p.badge === "Novo" ? "bg-blue-500 text-white" : "bg-green-500 text-black"}`}>
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{desc}%</span>
                  <span className="text-6xl group-hover:scale-110 transition-transform">{p.emoji}</span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-sm font-medium text-zinc-100 group-hover:text-green-400 transition-colors line-clamp-2 mb-2">{p.nome}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className={i < Math.floor(p.stars) ? "text-yellow-400 fill-yellow-400" : "text-zinc-700 fill-zinc-700"} />
                    ))}
                    <span className="text-[11px] text-zinc-500 ml-1">({p.reviews})</span>
                  </div>
                  <div className="mt-auto">
                    <p className="text-xs text-zinc-500 line-through">R$ {p.precoOld.toFixed(2).replace(".", ",")}</p>
                    <p className="text-xl font-bold text-white">R$ {p.preco.toFixed(2).replace(".", ",")}</p>
                    <p className="text-[11px] text-green-400 mb-1">à vista no Pix</p>
                    <p className="text-[11px] text-zinc-500">ou {p.parcelas}x de R$ {p.porcela.toFixed(2).replace(".", ",")}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-green-950/60 via-zinc-900 to-zinc-900 border border-green-900/40 rounded-3xl px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Monte sua academia em casa</h2>
            <p className="text-zinc-400 max-w-md">Equipamentos profissionais com entrega rápida, garantia e parcelamento em até 12x.</p>
          </div>
          <Link
            to="/catalogo"
            className="flex-shrink-0 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-10 py-4 rounded-xl transition-colors text-sm"
          >
            Ver catálogo completo <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
