
# Future.WORK – Global Solution (2º Semestre)

Este projeto faz parte da Global Solution do 2º semestre e foi desenvolvido com o objetivo de criar a **Future.WORK**, uma plataforma simples que simula uma rede profissional.  
Aqui o usuário pode ver perfis, filtrar profissionais, abrir detalhes, recomendar e enviar mensagens (simulação).  
O projeto foi separado porque cada matéria pede uma parte diferente, mas tudo usa o mesmo tema.

---

## Como o projeto está organizado

### **frontend/** – Entrega de Front-End Design / Web Dev  
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

### **backend-python/** – Entrega da matéria de Python  
API feita com **FastAPI**, usando **MongoDB**.  
Aqui reaproveitamos o mesmo JSON dos 60 perfis para popular o banco quando a API inicia.

Essa parte demonstra:

- Estruturas de decisão (filtros, validações)
- Estruturas de repetição (seed, loops, listagens)
- Funções separadas (CRUD, normalização, etc.)
- Rotas REST
- Comunicação com banco  

Como rodar:

```
cd backend-python
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Documentação da API:  
http://localhost:8000/docs

---

## Estrutura do projeto

```
future-work/
  frontend/
    src/
      App.jsx
      data/profissionais.json
      components/
  backend-python/
    app/
      main.py
      crud.py
      models.py
      seed_data.py
    frontend-data/profissionais.json
```

---

## Repositório

https://github.com/bernard0g/future-work/

---

## Integrantes

Bernardo Lozorio Gomes Y Gomes – **RM: 564943**

---

Esse projeto foi feito para cumprir as entregas das disciplinas, de forma simples, organizada e direta, seguindo exatamente o que foi pedido.
