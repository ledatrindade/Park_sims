// Importa o módulo 'express', que é um framework web para Node.js.
// Ele é usado para criar o servidor e definir rotas.
import express from 'express';

// Importa as funções de controlador específicas para operações de compra
// do módulo '../controllers/purchaseController.js'.
// Cada função controlará uma rota HTTP.
import { createPurchase, getPurchases, getTicketTypes } from '../controllers/purchaseController.js';

// Cria uma nova instância de 'Router' do Express.
// Um router permite agrupar rotas relacionadas e middleware,
// tornando o código mais modular e organizado.
const router = express.Router();

// Define a rota POST para '/compras'.
// Quando uma requisição POST é feita para esta URL,
// a função `createPurchase` do controlador será executada.
// Para que serve: Criar uma nova compra de ingressos.
router.post('/compras', createPurchase);

// Define a rota GET para '/compras'.
// Quando uma requisição GET é feita para esta URL,
// a função `getPurchases` do controlador será executada.
// Para que serve: Obter uma lista de todas as compras registradas.
router.get('/compras', getPurchases);

// Define a rota GET para '/ticket-types'.
// Quando uma requisição GET é feita para esta URL,
// a função `getTicketTypes` do controlador será executada.
// Para que serve: Obter os tipos de ingressos disponíveis e seus respectivos preços.
router.get('/ticket-types', getTicketTypes);

// Exporta o objeto 'router' para que ele possa ser utilizado
// em outros arquivos da aplicação (geralmente no arquivo principal do servidor)
// para registrar essas rotas.
export default router;