import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/catalogo"      element={<Catalog />} />
            <Route path="/produto/:id"   element={<Product />} />
            <Route path="/carrinho"      element={<Cart />} />
            <Route path="/checkout"      element={<Checkout />} />
            <Route path="/auth"          element={<Auth />} />
            <Route path="/dashboard/*"   element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
