import httpx


async def buscar_cep(cep: str) -> dict:
    cep = cep.replace("-", "").strip()
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://viacep.com.br/ws/{cep}/json/")
        response.raise_for_status()
        data = response.json()
        if "erro" in data:
            return None
        return data
