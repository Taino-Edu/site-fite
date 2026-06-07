# ──────────────────────────────────────────────────────────────
# shipping.py — Rotas de frete e CEP
#
# Endpoints disponíveis:
#   GET  /api/v1/shipping/cep/{cep}   → busca endereço pelo CEP
#   POST /api/v1/shipping/calcular    → calcula opções de frete
# ──────────────────────────────────────────────────────────────

from fastapi import APIRouter, HTTPException
from app.integrations.viacep import buscar_cep
from app.services.shipping_service import calcular_frete

# APIRouter agrupa rotas de um mesmo assunto
# O prefixo "/shipping" é adicionado no main.py
router = APIRouter()


# GET /api/v1/shipping/cep/01310100
# Retorna: { "cep": "01310-100", "logradouro": "Av. Paulista", "bairro": "Bela Vista", ... }
@router.get("/cep/{cep}")
async def consultar_cep(cep: str):
    data = await buscar_cep(cep)  # chama a integração com o ViaCEP

    # Se o CEP não existir, retornamos erro 404 (não encontrado)
    if not data:
        raise HTTPException(status_code=404, detail="CEP não encontrado")

    return data


# POST /api/v1/shipping/calcular
# Body: { "cep_origem": "...", "cep_destino": "...", "produtos": [...] }
# Retorna: lista de modalidades de frete com prazo e preço
@router.post("/calcular")
async def calcular(payload: dict):
    resultado = await calcular_frete(
        cep_origem=payload["cep_origem"],    # CEP do nosso armazém
        cep_destino=payload["cep_destino"],  # CEP do cliente
        produtos=payload["produtos"],        # lista de produtos para calcular peso/volume
    )
    return resultado
