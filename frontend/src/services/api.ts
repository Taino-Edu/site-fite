// ──────────────────────────────────────────────────────────────
// api.ts — Cliente HTTP centralizado (Axios)
//
// Em vez de escrever fetch() em cada arquivo, importamos este
// "api" configurado e pronto. Ele cuida automaticamente de:
//   - Apontar para o endereço certo do backend
//   - Enviar o token JWT em toda requisição autenticada
//   - Redirecionar para /auth quando o token expirar
// ──────────────────────────────────────────────────────────────

import axios from "axios";

// Cria uma instância do Axios com configuração base
const api = axios.create({
  // VITE_API_URL vem do .env do frontend (ex: http://meudominio.com/api/v1)
  // Se não estiver definido, usa localhost (desenvolvimento local)
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1",

  // Toda requisição enviará Content-Type: application/json por padrão
  headers: { "Content-Type": "application/json" },
});

// ── Interceptor de REQUISIÇÃO ─────────────────────────────────
// Executa ANTES de cada chamada à API
// Lê o token salvo no navegador e o adiciona no cabeçalho Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  // Se o usuário estiver logado, envia: Authorization: Bearer <token>
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config; // devolve a config modificada para o Axios prosseguir
});

// ── Interceptor de RESPOSTA ───────────────────────────────────
// Executa DEPOIS de receber a resposta da API
api.interceptors.response.use(
  (res) => res, // se deu certo, passa a resposta adiante sem alterar nada

  (err) => {
    // Se o servidor retornou 401 (não autorizado), o token expirou ou é inválido
    // Apagamos o token salvo e mandamos o usuário para a tela de login
    if (err.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/auth";
    }

    // Repassa o erro para quem chamou (para poder exibir mensagem de erro)
    return Promise.reject(err);
  }
);

export default api;
