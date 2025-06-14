// Importa todas as funções/métodos do módulo 'purchaseModel.js'.
// Este módulo é responsável pela lógica de interação com o banco de dados
// para operações relacionadas a compras e ingressos.
import * as purchaseModel from '../models/purchaseModel.js';

// Importa a conexão com o pool de banco de dados do módulo 'db.js'.
// O pool é usado para gerenciar e reutilizar conexões com o banco de dados.
import pool from '../db.js'; // Importa pool para getTicketTypes

/**
 * Função auxiliar para validar o formato de um endereço de e-mail.
 * Utiliza uma expressão regular para verificar se a string fornecida
 * corresponde a um padrão básico de e-mail.
 * @param {string} email - O endereço de e-mail a ser validado.
 * @returns {boolean} - Retorna true se o e-mail for válido, false caso contrário.
 */
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Define um array de strings que representam os tipos válidos de ingresso.
// Isso é usado para validação dos dados de entrada.
const tiposValidos = ['inteira', 'estudante', 'vip'];

/**
 * Controlador para a criação de uma nova compra.
 * Esta função lida com a requisição POST para '/api/compras'.
 * Realiza validações dos dados da requisição e, se tudo estiver correto,
 * chama o modelo para persistir a compra e os ingressos no banco de dados.
 * @param {Object} req - Objeto de requisição (contém os dados enviados pelo cliente).
 * @param {Object} res - Objeto de resposta (usado para enviar a resposta ao cliente).
 */
export const createPurchase = async (req, res) => {
  try {
    // Desestrutura os dados necessários do corpo da requisição.
    const { dia, email, ingressos } = req.body;

    // 1. Validação de campos obrigatórios:
    // Verifica se 'dia', 'email' e 'ingressos' estão presentes,
    // se 'ingressos' é um array e se não está vazio.
    if (!dia || !email || !ingressos || !Array.isArray(ingressos) || ingressos.length === 0) {
      return res.status(400).json({ message: 'Campos obrigatórios: dia, email e ingressos (array não vazio).' });
    }

    // 2. Validação do formato do e-mail:
    // Utiliza a função auxiliar `validateEmail` para verificar o formato do e-mail.
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'E-mail inválido.' });
    }

    // 3. Validação de cada ingresso individualmente:
    // Itera sobre o array de ingressos para validar as propriedades de cada um.
    for (const ingresso of ingressos) {
      if (
        !ingresso.nome || // Verifica se o nome do ingresso está presente
        !ingresso.tipo || // Verifica se o tipo do ingresso está presente
        !tiposValidos.includes(ingresso.tipo) || // Verifica se o tipo do ingresso é um dos tipos válidos
        (ingresso.cpf && !/^\d{11}$/.test(ingresso.cpf)) // Se o CPF estiver presente, valida se tem 11 dígitos numéricos
      ) {
        return res.status(400).json({ message: 'Cada ingresso precisa ter nome, tipo válido e CPF (11 dígitos numéricos) opcional válido.' });
      }
    }

    // 4. Tratamento do CPF para o banco de dados:
    // Mapeia o array de ingressos para substituir strings vazias de CPF por `null`.
    // Isso é comum para armazenar valores opcionais em colunas de banco de dados que aceitam NULL.
    const ingressosTratados = ingressos.map(ingresso => ({
      ...ingresso, // Copia todas as outras propriedades do ingresso
      cpf: ingresso.cpf === "" ? null : ingresso.cpf, // Define CPF como null se for uma string vazia
    }));

    // 5. Criação da compra no banco de dados:
    // Chama a função `createPurchaseWithTickets` do modelo de compra,
    // passando os dados da compra e os ingressos tratados.
    const purchaseId = await purchaseModel.createPurchaseWithTickets({ dia, email, ingressos: ingressosTratados });

    // 6. Resposta de sucesso:
    // Envia uma resposta JSON com status 201 (Created) e o ID da compra criada.
    res.status(201).json({ message: 'Compra realizada com sucesso!', purchaseId });
  } catch (error) {
    // 7. Tratamento de erros:
    // Em caso de qualquer erro durante o processo, loga o erro no console
    // e envia uma resposta JSON com status 500 (Internal Server Error).
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar compra' });
  }
};

/**
 * Controlador para buscar todas as compras registradas.
 * Esta função lida com a requisição GET para '/api/compras'.
 * Chama o modelo para obter todas as compras do banco de dados e as retorna.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */
export const getPurchases = async (req, res) => {
  try {
    // Chama a função `getAllPurchases` do modelo para obter todas as compras.
    const purchases = await purchaseModel.getAllPurchases();
    // Envia as compras obtidas como resposta JSON.
    res.json(purchases);
  } catch (error) {
    // Tratamento de erros: loga o erro e envia uma resposta 500.
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar compras' });
  }
};

/**
 * Controlador para buscar os tipos de ingresso e seus preços.
 * Esta função lida com a requisição GET para '/api/ticket-types'.
 * Consulta diretamente o banco de dados para obter os tipos de ingresso.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 */
export const getTicketTypes = async (req, res) => {
  try {
    // Executa uma consulta SQL para selecionar 'tipo' e 'preco' da tabela 'ticket_types'.
    // A desestruturação `[rows]` obtém apenas a primeira parte da resposta do pool.query,
    // que contém os resultados da consulta.
    const [rows] = await pool.query('SELECT tipo, preco FROM ticket_types');
    // Envia os tipos de ingresso e preços obtidos como resposta JSON.
    res.json(rows);
  } catch (error) {
    // Tratamento de erros: loga o erro e envia uma resposta 500.
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar tipos de ingresso' });
  }
};