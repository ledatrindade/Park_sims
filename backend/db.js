// Importa a biblioteca 'mysql2/promise'.
// Esta biblioteca é um cliente MySQL para Node.js que oferece uma API baseada em Promises,
// facilitando o trabalho com operações assíncronas de banco de dados.
import mysql from 'mysql2/promise';

// Importa a biblioteca 'dotenv'.
// Esta biblioteca carrega variáveis de ambiente de um arquivo .env
// para process.env, tornando as credenciais de banco de dados
// e outras configurações sensíveis seguras e separadas do código.
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env.
// Isso deve ser feito logo no início da aplicação para que
// as variáveis estejam disponíveis quando forem usadas.
dotenv.config();

// Cria um pool de conexões com o banco de dados MySQL.
// Um pool gerencia um conjunto de conexões abertas e prontas para uso,
// otimizando o desempenho ao evitar a sobrecarga de abrir e fechar
// uma nova conexão para cada requisição.
const pool = mysql.createPool({
  // Host do servidor de banco de dados, lido da variável de ambiente DB_HOST.
  host: process.env.DB_HOST,
  // Nome de usuário para autenticação no banco de dados, lido de DB_USER.
  user: process.env.DB_USER,
  // Senha do usuário do banco de dados, lida de DB_PASSWORD.
  password: process.env.DB_PASSWORD,
  // Nome do banco de dados ao qual se conectar, lido de DB_NAME.
  database: process.env.DB_NAME,
  // Define se o pool deve esperar por conexões disponíveis se o limite for atingido.
  // Se true, as requisições serão enfileiradas.
  waitForConnections: true,
  // O número máximo de conexões que o pool manterá abertas e ociosas.
  connectionLimit: 10,
  // O número máximo de requisições pendentes que podem ser enfileiradas quando
  // o limite de conexões é atingido. 0 significa sem limite.
  queueLimit: 0,
});

// Exporta o objeto 'pool' para que outras partes da aplicação
// (como os modelos) possam utilizá-lo para interagir com o banco de dados.
export default pool;