from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import auth, products, orders, users, shipping, payments
from app.core.config import settings

app = FastAPI(
    title="Site Fite API",
    version="1.0.0",
    docs_url="/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,     prefix="/api/v1/auth",     tags=["auth"])
app.include_router(users.router,    prefix="/api/v1/users",    tags=["users"])
app.include_router(products.router, prefix="/api/v1/products", tags=["products"])
app.include_router(orders.router,   prefix="/api/v1/orders",   tags=["orders"])
app.include_router(shipping.router, prefix="/api/v1/shipping", tags=["shipping"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["payments"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
