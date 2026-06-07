# 🏋️ Site Fite — E-commerce de Equipamentos de Musculação

E-commerce completo para venda de equipamentos fitness: halteres, barras, anilhas, racks, esteiras e acessórios.

**Stack:** React 19 + TypeScript · FastAPI (Python) · PostgreSQL · Redis · TailwindCSS

---

## 📋 Índice

- [O que é cada pasta](#-estrutura-do-projeto)
- [O que você precisa instalar](#-pré-requisitos)
- [Como rodar o projeto](#-como-rodar)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [APIs externas](#-apis-externas)
- [Páginas do site](#-páginas)
- [Comandos úteis](#-comandos-úteis)

---

## 📁 Estrutura do Projeto

```
site-fite/
│
├── frontend/          ← Tudo que o usuário vê no navegador (React)
│   └── src/
│       ├── pages/     ← Uma pasta por página do site
│       ├── components/← Peças reutilizáveis (Header, Footer, Cards...)
│       ├── hooks/     ← Lógica reutilizável (busca de CEP, carrinho...)
│       ├── services/  ← Comunicação com o backend (chamadas HTTP)
│       ├── store/     ← Estado global (carrinho, usuário logado...)
│       └── types/     ← Tipos TypeScript compartilhados
│
├── backend/           ← Servidor e banco de dados (Python/FastAPI)
│   └── app/
│       ├── api/v1/    ← Endpoints da API (rotas HTTP)
│       ├── core/      ← Configurações, banco, segurança
│       ├── models/    ← Tabelas do banco de dados
│       ├── schemas/   ← Validação de dados (entrada e saída)
│       ├── services/  ← Regras de negócio
│       └── integrations/ ← APIs externas (ViaCEP, Melhor Envio, etc.)
│
├── docker-compose.yml ← Sobe banco + redis com um comando
├── .env.example       ← Modelo do arquivo de configuração
└── .gitignore         ← Arquivos que o Git deve ignorar
```

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

| Ferramenta | Para quê serve | Como instalar |
|---|---|---|
| **Python 3.11+** | Rodar o backend | [python.org](https://www.python.org/downloads/) |
| **Node.js 20+** | Rodar o frontend | [nodejs.org](https://nodejs.org/) |
| **pnpm** | Gerenciador de pacotes do frontend | `npm install -g pnpm` |
| **PostgreSQL** | Banco de dados | [postgresql.org](https://www.postgresql.org/download/) ou via Docker |
| **Redis** | Cache e sessões | [redis.io](https://redis.io/docs/getting-started/) ou via Docker |
| **Git** | Controle de versão | [git-scm.com](https://git-scm.com/) |

> **Dica:** Se tiver Docker instalado, você pode pular PostgreSQL e Redis — o `docker-compose.yml` sobe os dois automaticamente.

---

## 🚀 Como Rodar

### Passo 1 — Clonar o projeto

```bash
git clone https://github.com/Taino-Edu/site-fite.git
cd site-fite
```

---

### Passo 2 — Configurar as variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Abra o `.env` e edite as linhas obrigatórias:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/sitefite
SECRET_KEY=cole_aqui_uma_chave_aleatoria_longa
```

> Para gerar uma `SECRET_KEY` segura, rode:
> ```bash
> python3 -c "import secrets; print(secrets.token_hex(32))"
> ```

---

### Passo 3 — Subir banco de dados e Redis (via Docker)

Se você tem Docker, este comando sobe PostgreSQL e Redis já configurados:

```bash
docker-compose up -d db redis
```

Se não tem Docker, instale PostgreSQL manualmente e crie o banco:

```sql
CREATE DATABASE sitefite;
```

---

### Passo 4 — Rodar o Backend (FastAPI)

```bash
# Entre na pasta do backend
cd backend

# Crie um ambiente virtual Python (boa prática — isola as dependências)
python3 -m venv .venv

# Ative o ambiente virtual
source .venv/bin/activate        # Linux / Mac
# ou
.venv\Scripts\activate           # Windows

# Instale as dependências
pip install -r requirements.txt

# Rode as migrations (cria as tabelas no banco de dados)
alembic upgrade head

# Inicie o servidor
uvicorn app.main:app --reload --port 8000
```

O backend estará rodando em: **http://localhost:8000**

Documentação automática da API: **http://localhost:8000/docs**

---

### Passo 5 — Rodar o Frontend (React)

Abra um **novo terminal** e:

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O site estará rodando em: **http://localhost:5173**

---

### ✅ Tudo rodando!

Se abriu sem erros, você verá:

- **http://localhost:5173** → Site completo
- **http://localhost:5173/catalogo** → Catálogo com filtros
- **http://localhost:8000/docs** → Documentação da API

---

## 🔑 Variáveis de Ambiente

Todas ficam no arquivo `.env` na raiz do projeto. **Nunca suba este arquivo para o GitHub.**

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | ✅ Sim | Endereço do banco PostgreSQL |
| `SECRET_KEY` | ✅ Sim | Chave para assinar tokens de login |
| `ALGORITHM` | Não | Algoritmo JWT (padrão: `HS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Não | Validade do token de acesso (padrão: 30 min) |
| `REDIS_URL` | Não | Endereço do Redis (padrão: `redis://localhost:6379`) |
| `MERCADO_PAGO_ACCESS_TOKEN` | Para pagamentos | Token da sua conta Mercado Pago |
| `MERCADO_PAGO_PUBLIC_KEY` | Para pagamentos | Chave pública do Mercado Pago |
| `MELHOR_ENVIO_TOKEN` | Para frete | Token da API Melhor Envio |
| `MELHOR_ENVIO_SANDBOX` | Não | `true` para testes, `false` para produção |
| `S3_BUCKET` | Para imagens | Nome do bucket para armazenar imagens |
| `S3_ACCESS_KEY` | Para imagens | Chave de acesso S3/R2 |
| `S3_SECRET_KEY` | Para imagens | Chave secreta S3/R2 |
| `VITE_API_URL` | Não | URL da API para o frontend (padrão: `http://localhost:8000/api/v1`) |

---

## 🔌 APIs Externas

O projeto usa três serviços externos. Veja como obter acesso:

### ViaCEP (gratuita, sem cadastro)
Usada para buscar endereço pelo CEP. Não precisa de token.
- Documentação: https://viacep.com.br

### Melhor Envio (frete)
1. Crie uma conta em https://melhorenvio.com.br
2. Vá em **Tokens de acesso** no painel
3. Gere um token e cole no `.env` em `MELHOR_ENVIO_TOKEN`
4. Deixe `MELHOR_ENVIO_SANDBOX=true` para testar sem custo real

### Mercado Pago (pagamentos)
1. Crie uma conta em https://mercadopago.com.br/developers
2. Crie uma aplicação no painel de desenvolvedores
3. Copie o **Access Token** e cole em `MERCADO_PAGO_ACCESS_TOKEN`
4. Use credenciais de **teste** durante o desenvolvimento

---

## 📄 Páginas

| URL | Página | Status |
|---|---|---|
| `/` | Home — Hero, categorias, destaques | ✅ Pronta |
| `/catalogo` | Catálogo com filtros e grid de produtos | ✅ Pronta |
| `/produto/:id` | Detalhe do produto | 🚧 Em construção |
| `/carrinho` | Carrinho de compras | 🚧 Em construção |
| `/checkout` | Finalizar pedido + CEP + frete | 🚧 Em construção |
| `/auth` | Login e cadastro | 🚧 Em construção |
| `/dashboard` | Área do cliente | 🚧 Em construção |

---

## 🛠 Comandos Úteis

### Backend

```bash
# Ativar ambiente virtual
source backend/.venv/bin/activate

# Rodar servidor com reload automático
uvicorn app.main:app --reload --port 8000

# Criar nova migration (após alterar um model)
alembic revision --autogenerate -m "descricao da mudanca"

# Aplicar migrations pendentes
alembic upgrade head

# Rodar testes
pytest

# Ver dependências instaladas
pip list
```

### Frontend

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento (com hot reload)
pnpm dev

# Gerar build de produção
pnpm build

# Pré-visualizar o build de produção
pnpm preview
```

### Git

```bash
# Ver status dos arquivos
git status

# Adicionar e commitar
git add .
git commit -m "feat: descrição do que foi feito"

# Enviar para o GitHub
git push
```

---

## 🐛 Problemas Comuns

**`ModuleNotFoundError` ao rodar o backend**
> Você esqueceu de ativar o ambiente virtual. Rode `source .venv/bin/activate`

**`CORS error` no navegador**
> O backend não está rodando, ou `ALLOWED_ORIGINS` no `.env` não inclui `http://localhost:5173`

**`Connection refused` no banco**
> PostgreSQL não está rodando. Rode `docker-compose up -d db` ou inicie o serviço manualmente

**Tailwind CSS não está aplicando estilos**
> Verifique se o arquivo `postcss.config.js` existe em `frontend/`. Se não, crie-o com o conteúdo do `.env.example`

**`pnpm: command not found`**
> Instale o pnpm: `npm install -g pnpm`

---

## 📦 Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| React | 19 | Interface do usuário |
| TypeScript | 5 | Tipagem estática do JavaScript |
| Vite | 6 | Servidor de desenvolvimento e build |
| TailwindCSS | 3 | Estilização |
| Zustand | 5 | Estado global (carrinho, auth) |
| React Router | 7 | Navegação entre páginas |
| Axios | 1 | Chamadas HTTP para o backend |
| FastAPI | 0.136 | Framework web Python |
| SQLAlchemy | 2 | ORM (mapeamento banco↔Python) |
| Alembic | 1.13 | Migrations do banco de dados |
| psycopg | 3 | Driver PostgreSQL para Python |
| Pydantic | 2 | Validação de dados |
| PostgreSQL | 18 | Banco de dados relacional |
| Redis | 7 | Cache e sessões |

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feat/nome-da-feature`
2. Faça suas alterações e commit: `git commit -m "feat: descrição"`
3. Suba a branch: `git push origin feat/nome-da-feature`
4. Abra um Pull Request no GitHub

---

Feito com 💚 por [Taino-Edu](https://github.com/Taino-Edu)
