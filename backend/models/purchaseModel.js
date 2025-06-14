// Importa o objeto 'pool' do módulo '../db.js'.
// O 'pool' é uma pool de conexões com o banco de dados, usada para gerenciar
// e reutilizar conexões eficientemente.
import pool from '../db.js';

/**
 * Função para criar uma nova compra e associar os ingressos a ela.
 * Utiliza transações de banco de dados para garantir a atomicidade (tudo ou nada)
 * da operação: ou a compra e todos os ingressos são inseridos com sucesso,
 * ou nada é inserido.
 * @param {Object} data - Objeto contendo os dados da compra e dos ingressos.
 * @param {string} data.dia - A data da visita para a compra.
 * @param {string} data.email - O e-mail do comprador.
 * @param {Array<Object>} data.ingressos - Um array de objetos, onde cada objeto representa um ingresso.
 * Cada ingresso deve ter 'nome', 'cpf' (opcional) e 'tipo'.
 * @returns {number} O ID da compra recém-criada.
 * @throws {Error} Se ocorrer um erro durante a inserção ou se um tipo de ingresso for inválido.
 */
export const createPurchaseWithTickets = async ({ dia, email, ingressos }) => {
  // Obtém uma conexão do pool.
  const conn = await pool.getConnection();
  try {
    // Inicia uma transação de banco de dados.
    await conn.beginTransaction();

    // 1. Inserir a compra principal na tabela 'purchases'.
    const [purchaseResult] = await conn.query(
      'INSERT INTO purchases (dia, email) VALUES (?, ?)',
      [dia, email] // Os valores são passados como um array para evitar SQL Injection.
    );
    // Obtém o ID da compra recém-inserida.
    const purchaseId = purchaseResult.insertId;

    // 2. Iterar sobre cada ingresso para inseri-lo individualmente.
    for (const ingresso of ingressos) {
      // Desestrutura as propriedades do ingresso. 'cpf' recebe 'null' por padrão se não existir.
      const { nome, cpf = null, tipo } = ingresso;

      // 2.1. Buscar o 'ticket_type_id' (ID do tipo de ingresso) na tabela 'ticket_types'
      // com base no 'tipo' textual (ex: 'inteira', 'estudante', 'vip').
      const [rows] = await conn.query(
        'SELECT id FROM ticket_types WHERE tipo = ?',
        [tipo]
      );
      // Se nenhum tipo de ingresso correspondente for encontrado, lança um erro.
      if (rows.length === 0) {
        throw new Error(`Tipo de ingresso inválido: ${tipo}`);
      }
      // Obtém o 'ticket_type_id' do resultado da consulta.
      const ticket_type_id = rows[0].id;

      // 2.2. Inserir o ingresso na tabela 'tickets', associando-o à compra e ao tipo de ingresso.
      await conn.query(
        'INSERT INTO tickets (purchase_id, nome, cpf, ticket_type_id) VALUES (?, ?, ?, ?)',
        [purchaseId, nome, cpf, ticket_type_id] // Os valores são passados como um array.
      );
    }

    // 3. Se todas as operações (inserção da compra e de todos os ingressos) foram bem-sucedidas,
    // comita a transação, tornando as alterações permanentes no banco de dados.
    await conn.commit();
    // Retorna o ID da compra criada.
    return purchaseId;
  } catch (error) {
    // 4. Em caso de qualquer erro, reverte a transação (rollback).
    // Isso garante que nenhuma alteração parcial seja salva no banco, mantendo a integridade dos dados.
    await conn.rollback();
    // Re-lança o erro para que o controlador que chamou esta função possa lidar com ele.
    throw error;
  } finally {
    // 5. Libera a conexão de volta para o pool, independentemente do sucesso ou falha.
    // Isso é crucial para evitar o esgotamento das conexões do banco de dados.
    conn.release();
  }
};

/**
 * Função para buscar todas as compras registradas, incluindo seus ingressos detalhados
 * e o preço total de cada compra.
 * @returns {Array<Object>} Um array de objetos, onde cada objeto representa uma compra
 * com seus detalhes e um array de ingressos associados.
 * @throws {Error} Se ocorrer um erro durante a consulta ao banco de dados.
 */
export const getAllPurchases = async () => {
  // Obtém uma conexão do pool.
  const conn = await pool.getConnection();
  try {
    // 1. Consulta todas as compras da tabela 'purchases'.
    // Os resultados são ordenados pela data de criação em ordem decrescente.
    const [purchases] = await conn.query(
      'SELECT * FROM purchases ORDER BY criada_em DESC'
    );

    // 2. Para cada compra, busca os ingressos associados e calcula o preço total.
    for (const purchase of purchases) {
      // 2.1. Consulta os ingressos associados a esta compra,
      // juntando (JOIN) com a tabela 'ticket_types' para obter o tipo textual e o preço.
      const [tickets] = await conn.query(`
        SELECT t.nome, t.cpf, tt.tipo, tt.preco
        FROM tickets t
        JOIN ticket_types tt ON t.ticket_type_id = tt.id
        WHERE t.purchase_id = ?
      `, [purchase.id]); // O ID da compra é usado para filtrar os ingressos.

      // 2.2. Adiciona o array de ingressos à propriedade 'ingressos' do objeto da compra.
      purchase.ingressos = tickets;

      // 2.3. Calcula o preço total da compra.
      // Utiliza o método 'reduce' para somar o 'preco' de cada ingresso.
      // `Number(ticket.preco)` é usado para garantir que o 'preco' seja tratado como um número,
      // evitando concatenação de strings se 'preco' for retornado como string pelo banco de dados.
      purchase.precoTotal = tickets.reduce((total, ticket) => total + Number(ticket.preco), 0);
    }

    // 3. Retorna o array de compras, agora com os detalhes dos ingressos e o preço total.
    return purchases;
  } finally {
    // 4. Libera a conexão de volta para o pool, garantindo que os recursos sejam devolvidos.
    conn.release();
  }
};