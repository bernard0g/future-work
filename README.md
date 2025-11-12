# Future.WORK - Global Solution

Monorepo com duas entregas separadas, usando o mesmo contexto de problema:

- **frontend/** → entrega de Front-End Design / Web Dev (React, Tailwind, JSON local).
- **backend/** → entrega de Python (API REST com FastAPI + MongoDB).

A ideia é que o front funcione sozinho com JSON local,
enquanto o backend reutiliza o mesmo conjunto de perfis para demonstrar
estruturas de decisão, repetição, funções e comunicação com banco de dados.

---

## 1. Front-End Design / Web Dev (React + Tailwind + JSON)

Pasta: `frontend/`

### Tecnologias

- React 18
- Vite
- Tailwind CSS
- JSON local (`src/data/profissionais.json`)

### Requisitos atendidos

- SPA com listagem de profissionais em cards.
- Arquivo JSON local com 60 perfis simulados.
- Filtros por:
  - Busca geral (nome, cargo, resumo)
  - Área
  - Cidade
  - Tecnologia
- Modal de detalhes com:
  - Resumo
  - Habilidades técnicas
  - Soft skills
  - Experiências
  - Formação
  - Projetos
  - Idiomas e interesses
- Botão de recomendação (incremento local de recomendações).
- Formulário de envio de mensagem (simulado em memória, com `console.log`).
- Tema claro/escuro com Tailwind (`darkMode: "class"`).

### Como rodar o front

1. Acesse a pasta:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Rode em modo desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

- http://localhost:5173

O front lê os dados diretamente de:

- `src/data/profissionais.json`

Não há dependência do back-end para essa entrega.

---

## 2. Python / API REST (FastAPI + MongoDB)

Pasta: `backend/`

### Tecnologias

- Python 3.11+
- FastAPI
- Uvicorn
- MongoDB
- Pydantic 2
- python-dotenv

### Requisitos atendidos

- Estruturas de decisão:
  - Filtros por área, cidade, tecnologia e busca na camada de CRUD.
  - Validação de `profissional_id` em rotas de mensagem e recomendação.
- Estruturas de repetição:
  - Iteração sobre documentos do MongoDB.
  - Seed de múltiplos profissionais a partir de um JSON.
- Funções:
  - Camada de serviço/CRUD desacoplada das rotas.
  - Funções de acesso ao banco e normalização de documentos.
- Criação de APIs REST:
  - Rotas `GET`, `POST` com modelos Pydantic e códigos de status adequados.
- Comunicação com banco de dados:
  - Integração com MongoDB via `pymongo`.

### Fonte de dados

O backend utiliza o mesmo JSON de profissionais que o front:

- Front-end: `frontend/src/data/profissionais.json`
- Backend: cópia em `backend/frontend-data/profissionais.json`

No startup da aplicação, o arquivo JSON é lido e os perfis são inseridos na coleção
`professionals` do MongoDB, caso o banco esteja vazio.

### Como rodar o backend

1. Acesse a pasta:

```bash
cd backend
```

2. Crie e ative um ambiente virtual (recomendado):

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux / macOS
source .venv/bin/activate
```

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

4. Configure o MongoDB, se quiser alterar o padrão:

Crie um arquivo `.env` dentro de `backend` se precisar mudar a URI ou o nome do banco:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=gs_future_work
```

Se não criar, o projeto usa exatamente esses valores como padrão.

5. Suba a API:

```bash
uvicorn app.main:app --reload --port 8000
```

Endpoints principais:

- Healthcheck: `GET /health`
- Listar profissionais: `GET /api/professionals`
- Detalhar profissional: `GET /api/professionals/{id}`
- Criar profissional: `POST /api/professionals`
- Recomendar profissional: `POST /api/professionals/{id}/recommend`
- Enviar mensagem: `POST /api/messages`

Documentação automática:

- http://localhost:8000/docs

---

## 3. Estrutura de pastas

```text
future-work-full/
  backend/
    app/
      __init__.py
      config.py
      database.py
      models.py
      crud.py
      main.py
      seed_data.py
    frontend-data/
      profissionais.json
    requirements.txt

  frontend/
    index.html
    package.json
    postcss.config.mjs
    tailwind.config.mjs
    vite.config.mjs
    src/
      main.jsx
      index.css
      App.jsx
      data/
        profissionais.json
      components/
        Header.jsx
        Filters.jsx
        ProfessionalCard.jsx
        ProfessionalModal.jsx

  README.md
```

---

## INTEGRANTES

Bernardo Lozorio Gomes Y Gomes | RM: 564943
