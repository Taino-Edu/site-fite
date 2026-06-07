import { useState } from "react";
import api from "../services/api";

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export function useCep() {
  const [data, setData] = useState<CepData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buscar(cep: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/shipping/cep/${cep}`);
      setData(res.data);
    } catch {
      setError("CEP não encontrado");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, buscar };
}
