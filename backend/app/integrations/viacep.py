# ──────────────────────────────────────────────────────────────
# viacep.py — Integração com a API gratuita ViaCEP
#
# ViaCEP é uma API pública e gratuita que retorna o endereço
# completo a partir de um CEP brasileiro.
# Documentação: https://viacep.com.br
# ──────────────────────────────────────────────────────────────

import httpx  # biblioteca para fazer requisições HTTP de forma assíncrona


async def buscar_cep(cep: str) -> dict:
    # Remove traços e espaços do CEP antes de enviar
    # Ex: "01310-100" vira "01310100"
    cep = cep.replace("-", "").strip()

    # "async with" garante que a conexão HTTP é fechada corretamente após o uso
    async with httpx.AsyncClient() as client:
        # Faz a requisição GET para a API do ViaCEP
        # Ex: https://viacep.com.br/ws/01310100/json/
        response = await client.get(f"https://viacep.com.br/ws/{cep}/json/")

        # Lança exceção se a resposta tiver erro HTTP (4xx, 5xx)
        response.raise_for_status()

        data = response.json()

        # O ViaCEP retorna { "erro": true } quando o CEP não existe
        if "erro" in data:
            return None

        # Retorna o dicionário com logradouro, bairro, cidade, UF, etc.
        return data
