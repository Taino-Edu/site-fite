// ──────────────────────────────────────────────────────────────
// useCep.ts — Hook para buscar endereço pelo CEP
//
// Um "hook" no React é uma função que encapsula lógica reutilizável.
// Em vez de repetir o código de busca de CEP em cada componente,
// chamamos useCep() onde precisar e ele já cuida de tudo.
//
// Uso:
//   const { data, loading, error, buscar } = useCep();
//   buscar("01310100"); // dispara a busca
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import api from "../services/api";

// Define o formato dos dados que voltam do backend
interface CepData {
  cep: string;        // "01310-100"
  logradouro: string; // "Avenida Paulista"
  bairro: string;     // "Bela Vista"
  localidade: string; // "São Paulo"
  uf: string;         // "SP"
}

export function useCep() {
  // data = endereço encontrado (null se ainda não buscou ou deu erro)
  const [data, setData] = useState<CepData | null>(null);

  // loading = true enquanto a requisição está em andamento
  const [loading, setLoading] = useState(false);

  // error = mensagem de erro, ou null se não houve erro
  const [error, setError] = useState<string | null>(null);

  // Função que dispara a busca — o componente chama ela no onChange do input
  async function buscar(cep: string) {
    setLoading(true);
    setError(null); // limpa erro anterior antes de tentar de novo

    try {
      // Chama GET /api/v1/shipping/cep/{cep} no backend
      const res = await api.get(`/shipping/cep/${cep}`);
      setData(res.data); // salva o endereço retornado
    } catch {
      setError("CEP não encontrado");
      setData(null);
    } finally {
      // finally sempre executa, com erro ou sem — desliga o loading
      setLoading(false);
    }
  }

  // Retorna tudo que o componente precisa para mostrar o resultado
  return { data, loading, error, buscar };
}
