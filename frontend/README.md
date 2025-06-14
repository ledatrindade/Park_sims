# 🌳 PARK SIMS — Sistema de Ingressos Online
# Projeto criado com propósito educacional e prático: simular a compra de ingressos em um parque temático fictício.
# Desenvolvido por Lêda Trindade, 2025.

# ✉️ Contato: ledatrindade.dev@gmail.com
# 💡 O Park Sims é um site que representa um parque temático fictício.
# O objetivo é demonstrar na prática como funciona uma aplicação web completa, com:
#   - Cadastro de ingressos
#   - Tipos de ingressos (inteira, estudante, VIP)
#   - Integração total entre frontend, backend e banco de dados
# Tudo foi feito com dedicação, usando ferramentas modernas, simulação real e uma ideia criativa.

# ------------------------------------------------------------
# 📁 Estrutura do projeto
# ------------------------------------------------------------

# parque-sims/
# ├── frontend/     # Interface (React + Vite)
# ├── backend/      # API (Node.js + Express)
# └── database/     # Dump do MySQL com estrutura e dados

# ------------------------------------------------------------
# 🔗 Conexão Front ↔ Back ↔ Banco
# ------------------------------------------------------------

# O React envia dados via `fetch` para a API:
# fetch("http://localhost:3000/api/purchases", {...})

# O backend recebe via rotas Express:
# app.post("/api/purchases", async (req, res) => {...})

# O backend se conecta ao banco de dados MySQL para salvar as informações.

# ------------------------------------------------------------
# 🛠️ Como rodar o projeto localmente
# ------------------------------------------------------------

# 1️⃣ Clone o repositório
git clone https://github.com/seu-usuario/parque-sims.git
cd parque-sims

# 2️⃣ Configure o banco de dados

# Opção A: Usando Docker
cd database
docker cp parque.sql nome_do_container:/parque.sql
docker exec -it nome_do_container bash
mysql -u root -p parque < /parque.sql

# Opção B: Usando ferramenta gráfica (DBeaver, MySQL Workbench etc)
# - Crie um banco de dados chamado `parque`
# - Importe o arquivo ./database/parque.sql

# 3️⃣ Inicie o backend
cd ../backend
npm install

# Verifique as configurações de conexão com MySQL no seu db.js
npm start

# Backend deve rodar em: http://localhost:3000

# 4️⃣ Inicie o frontend
cd ../frontend
npm install
npm run dev

# Frontend estará disponível em: http://localhost:5173 (ou a porta exibida)

# ------------------------------------------------------------
# ✅ Agora é só usar!
# ------------------------------------------------------------
# - Acesse o site
# - Escolha tipo de ingresso
# - Preencha nome, CPF, e-mail
# - Envie e confira a confirmação!

# ------------------------------------------------------------
# 📝 Extras
# ------------------------------------------------------------

# ✔️ Banco de dados MySQL v8 incluído com estrutura + dados
# ✔️ Dump salvo em ./database/parque.sql
# ✔️ Pode ser importado manualmente ou por Docker
# ✔️ Ideal para testes locais e estudo de CRUD completo

# ------------------------------------------------------------
# 🧠 Por que esse projeto existe?
# ------------------------------------------------------------
# Criado para treinar e aplicar conhecimentos em:
# - Desenvolvimento Web Full Stack
# - Integração de frontend e backend
# - Uso de banco de dados relacional
# - Organização de projetos reais
# Além disso, foi feito com carinho, criatividade e a vontade de construir algo funcional e bonito.

# ------------------------------------------------------------
# 🔚
# Desenvolvido por Lêda Trindade — 2025
# Contato: ledatrindade94@gmail.com
