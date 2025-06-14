// Importa o módulo 'express', que é um framework web robusto para Node.js.
// Ele simplifica a criação de servidores web e o gerenciamento de rotas HTTP.
import express from 'express';

// Importa o módulo 'cors'.
// CORS (Cross-Origin Resource Sharing) é um mecanismo que permite que recursos
// de uma página web sejam requisitados a partir de outro domínio fora do domínio onde o primeiro recurso se originou.
// Este middleware é essencial para permitir que seu frontend (rodando em um domínio/porta diferente)
// se comunique com seu backend.
import cors from 'cors';

// Importa o módulo 'dotenv'.
// 'dotenv' é uma biblioteca que carrega variáveis de ambiente de um arquivo .env
// para `process.env`. Isso é crucial para armazenar configurações sensíveis (como portas,
// credenciais de banco de dados) de forma segura e fora do código-fonte.
import dotenv from 'dotenv';

// Importa as rotas relacionadas a compras do módulo './routes/purchasesRoutes.js'.
// Isso organiza o código, separando a definição de rotas da configuração principal do servidor.
import purchaseRoutes from './routes/purchasesRoutes.js';

// Carrega as variáveis de ambiente do arquivo .env para `process.env`.
// Esta linha deve ser executada antes de qualquer uso de `process.env` relacionado a configurações.
dotenv.config();

// Cria uma instância da aplicação Express.
// 'app' será o objeto principal através do qual você configurará seu servidor.
const app = express();

// Middleware: `app.use(cors())`
// Habilita o CORS para todas as rotas da aplicação.
// Isso permite que requisições de diferentes origens (domínios/portas) sejam aceitas pelo seu servidor.
app.use(cors());

// Middleware: `app.use(express.json())`
// Este middleware embutido do Express é responsável por analisar corpos de requisição JSON.
// Ele automaticamente transforma strings JSON recebidas em objetos JavaScript no `req.body`,
// tornando os dados acessíveis e fáceis de trabalhar.
app.use(express.json());

// Configuração de rotas: `app.use('/api', purchaseRoutes)`
// Monta o `purchaseRoutes` (o objeto `router` que você definiu) sob o prefixo '/api'.
// Isso significa que todas as rotas definidas em `purchaseRoutes.js` (ex: '/compras', '/ticket-types')
// estarão acessíveis através de '/api/compras', '/api/ticket-types', etc.
// Isso ajuda a organizar a API e permite versionamento futuro (ex: '/api/v1').
app.use('/api', purchaseRoutes);

// Define a porta em que o servidor irá escutar.
// Ele tenta usar a porta definida na variável de ambiente PORT (útil para ambientes de produção como Heroku, Vercel),
// ou fallback para a porta 3001 se a variável de ambiente não estiver definida.
const PORT = process.env.PORT || 3001;

// Inicia o servidor Express.
// O servidor começa a escutar por requisições HTTP na porta especificada.
// Uma função de callback é executada quando o servidor é iniciado com sucesso,
// logando uma mensagem no console.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});