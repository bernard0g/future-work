
# Future.WORK – Global Solution (2º Semestre)

Este projeto faz parte da Global Solution do 2º semestre e foi desenvolvido com o objetivo de criar a **Future.WORK**, uma plataforma simples que simula uma rede profissional.  
Aqui o usuário pode ver perfis, filtrar profissionais, abrir detalhes, recomendar e enviar mensagens (simulação).  
O projeto foi separado porque cada matéria pede uma parte diferente, mas tudo usa o mesmo tema.

---

## Como o projeto está organizado

### **frontend/** 
Parte feita em **React**, **Vite** e **TailwindCSS**.  
Aqui usamos apenas um **arquivo JSON local** com 60 perfis.  
Não depende de servidor, API ou banco – tudo funciona direto no navegador.

O que tem no front:

- Lista de profissionais  
- Filtros por busca, área, cidade e tecnologia  
- Modal com informações completas  
- Recomendar (incrementa localmente, salvo no localStorage)  
- Enviar mensagem (simulado com alert e console.log)  
- Tema claro/escuro  
- SPA simples e funcional  

Como rodar:

```
cd frontend
npm install
npm run dev
```

Acessar:  
http://localhost:5173

---

### **backend/**
API feita com **FastAPI**, usando **MongoDB**.  
Aqui reaproveitamos o mesmo JSON dos 60 perfis para popular o banco quando a API inicia.

Neste backend eu implementei uma API em FastAPI que reutiliza os mesmos perfis do front-end, lendo um JSON e armazenando em um banco MongoDB.

A API permite listar, filtrar, criar e recomendar profissionais, além de registrar mensagens.
No código foram aplicadas estruturas de decisão (filtros e validações), estruturas de repetição (loops em listagens e seed de dados), funções separadas na camada de CRUD e integração real com o banco de dados.

Essa parte demonstra:

- Estruturas de decisão (filtros, validações)
- Estruturas de repetição (seed, loops, listagens)
- Funções separadas (CRUD, normalização, etc.)
- Rotas REST
- Comunicação com banco
- Endpoints funcionais:
```bash
> GET /api/professionals
> GET /api/professionals/{id}
> POST /api/professionals/{id}/recommend
> POST /api/messages
```

Como rodar:

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

MongoDB precisa estar rodando localmente.

Documentação da API:  
http://localhost:8000/docs

---

## Estrutura do projeto

```
future-work/
│   README.md
│
├───backend
│   │   requirements.txt
│   │
│   ├───app
│   │       config.py
│   │       crud.py
│   │       database.py
│   │       main.py
│   │       models.py
│   │       seed_data.py
│   │       __init__.py
│   │
│   └───frontend-data
│           profissionais.json
│
└───frontend
    │   index.html
    │   package.json
    │   postcss.config.mjs
    │   tailwind.config.mjs
    │   vite.config.mjs
    │
    └───src
        │   App.jsx
        │   index.css
        │   main.jsx
        │
        ├───components
        │       Filters.jsx
        │       Header.jsx
        │       ProfessionalCard.jsx
        │       ProfessionalModal.jsx
        │
        └───data
                profissionais.json

```

---

## Repositório

https://github.com/bernard0g/future-work/

---

## Integrantes

Bernardo Lozorio Gomes Y Gomes – **RM: 564943**
