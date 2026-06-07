# ──────────────────────────────────────────────────────────────
# main.py — Ponto de entrada do servidor backend
#
# É aqui que o FastAPI "nasce". Tudo começa neste arquivo:
#   1. Criamos a aplicação
#   2. Configuramos o CORS (quem pode falar com a API)
#   3. Registramos todas as rotas (endpoints)
# ──────────────────────────────────────────────────────────────

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importamos cada grupo de rotas (um arquivo por assunto)
from app.api.v1 import auth, products, orders, users, shipping, payments

# Importamos as configurações lidas do arquivo .env
from app.core.config import settings

# Criamos a aplicação FastAPI
# - title e version aparecem na documentação automática em /docs
app = FastAPI(
    title="Site Fite API",
    version="1.0.0",
    docs_url="/docs",  # Acesse http://localhost:8000/docs para ver todos os endpoints
)

# CORS = Cross-Origin Resource Sharing
# Sem isso o navegador bloqueia o frontend de chamar a API.
# allow_origins define quais endereços podem fazer requisições (ex: o React em localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,  # vem do .env
    allow_credentials=True,                  # permite enviar cookies/token
    allow_methods=["*"],                     # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],                     # Authorization, Content-Type, etc.
)

# Registramos cada roteador com seu prefixo de URL
# Ex: tudo em auth.py vira  →  /api/v1/auth/...
#     tudo em products.py   →  /api/v1/products/...
app.include_router(auth.router,     prefix="/api/v1/auth",     tags=["auth"])
app.include_router(users.router,    prefix="/api/v1/users",    tags=["users"])
app.include_router(products.router, prefix="/api/v1/products", tags=["products"])
app.include_router(orders.router,   prefix="/api/v1/orders",   tags=["orders"])
app.include_router(shipping.router, prefix="/api/v1/shipping", tags=["shipping"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["payments"])


# Rota de "health check" — usada para saber se o servidor está vivo
# Ex: monitoramentos e o Docker chamam GET /health para checar se tudo ok
@app.get("/health")
def health_check():
    return {"status": "ok"}
