// ──────────────────────────────────────────────────────────────
// App.tsx — Componente raiz da aplicação
//
// É o "esqueleto" do site. Define:
//   - O sistema de rotas (qual página aparece em cada URL)
//   - O layout global (Header sempre em cima, Footer sempre embaixo)
//   - O fundo e cor padrão do site inteiro
// ──────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes de layout que ficam em TODAS as páginas
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Páginas — cada uma é carregada só quando o usuário navega para aquela URL
import Home      from "./pages/Home";
import Catalog   from "./pages/Catalog";
import Product   from "./pages/Product";
import Cart      from "./pages/Cart";
import Checkout  from "./pages/Checkout";
import Auth      from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    // BrowserRouter ativa o sistema de rotas do React (usa a URL do navegador)
    <BrowserRouter>
      {/* Div raiz: ocupa a tela inteira, fundo escuro, texto branco */}
      <div className="min-h-screen flex flex-col bg-zinc-950 text-white">

        {/* Header fica fixo no topo — aparece em todas as páginas */}
        <Header />

        {/* main cresce para preencher o espaço entre o header e o footer */}
        <main className="flex-1">
          <Routes>
            {/* Cada Route mapeia uma URL para um componente de página */}
            <Route path="/"            element={<Home />} />       {/* Página inicial */}
            <Route path="/catalogo"    element={<Catalog />} />    {/* Lista de produtos */}
            <Route path="/produto/:id" element={<Product />} />    {/* Detalhe do produto (:id é dinâmico) */}
            <Route path="/carrinho"    element={<Cart />} />       {/* Carrinho de compras */}
            <Route path="/checkout"    element={<Checkout />} />   {/* Finalizar compra */}
            <Route path="/auth"        element={<Auth />} />       {/* Login / Cadastro */}
            <Route path="/dashboard/*" element={<Dashboard />} />  {/* Área do cliente (* = sub-rotas) */}
          </Routes>
        </main>

        {/* Footer fica sempre no rodapé */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
