const { Pool } = require('pg');

// Configuração
const pool = new Pool({
    user: 'usuario_teste',
    host: 'localhost',
    database: 'receitas_db',
    password: 'admin123testes',
    port: 5432
});

// Tentativa de conexão/retorno
pool.connect()
    .then(() => console.log('Conexão com PostgreSQL'))
    .catch(err => console.error('Erro ao conectar no PostgreSQL:', err));

module.exports = pool;
