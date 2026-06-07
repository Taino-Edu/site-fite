from fastapi import APIRouter, HTTPException
from app.integrations.viacep import buscar_cep
from app.services.shipping_service import calcular_frete

router = APIRouter()


@router.get("/cep/{cep}")
async def consultar_cep(cep: str):
    data = await buscar_cep(cep)
    if not data:
        raise HTTPException(status_code=404, detail="CEP não encontrado")
    return data


@router.post("/calcular")
async def calcular(payload: dict):
    resultado = await calcular_frete(
        cep_origem=payload["cep_origem"],
        cep_destino=payload["cep_destino"],
        produtos=payload["produtos"],
    )
    return resultado
