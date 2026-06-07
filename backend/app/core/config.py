# ──────────────────────────────────────────────────────────────
# config.py — Configurações globais do backend
#
# Lê automaticamente o arquivo .env na raiz do projeto.
# Nunca coloque senhas direto no código — sempre use .env!
# ──────────────────────────────────────────────────────────────

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Endereço completo do banco de dados PostgreSQL
    # Formato: postgresql://usuario:senha@host:porta/nome_do_banco
    DATABASE_URL: str

    # Chave secreta usada para assinar os tokens JWT (login)
    # Gere uma forte com: python -c "import secrets; print(secrets.token_hex(32))"
    SECRET_KEY: str

    # Algoritmo de criptografia do token — HS256 é o padrão mais usado
    ALGORITHM: str = "HS256"

    # Quanto tempo o token de acesso dura (em minutos)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Quanto tempo o token de renovação dura (em dias)
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Endereço do Redis — usado para cache e controle de sessão
    REDIS_URL: str = "redis://localhost:6379"

    # Configurações do bucket S3 (ou Cloudflare R2) para guardar imagens/arquivos
    S3_BUCKET: str = ""
    S3_REGION: str = "us-east-1"
    S3_ACCESS_KEY: str = ""
    S3_SECRET_KEY: str = ""

    # Token do Mercado Pago para processar pagamentos
    MERCADO_PAGO_ACCESS_TOKEN: str = ""

    # Token da API Melhor Envio para calcular frete
    MELHOR_ENVIO_TOKEN: str = ""

    # Quando True, usa o ambiente de testes do Melhor Envio (sem cobrar de verdade)
    MELHOR_ENVIO_SANDBOX: bool = True

    # Lista de origens que podem acessar a API (CORS)
    # Em produção, troque para o domínio real do seu site
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173"]

    class Config:
        # Diz para o Pydantic ler variáveis do arquivo .env automaticamente
        env_file = ".env"


# Instância global — importe "settings" em qualquer lugar do projeto
settings = Settings()
