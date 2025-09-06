
//  Rota /
//  GET  localhost:7000

//  Rota /

const pool = require('./configuracao/conexaoBD');

async function testar() {
    const resultado = await pool.query('SELECT NOW()');
    console.log('Hora do servidor PostgreSQL:', resultado.rows[0]);
    pool.end();
}

testar();
