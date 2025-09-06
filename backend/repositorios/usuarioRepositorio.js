const db = require('../configuracao/db');

// Cadastra o usuário e retorna id 
async function cadastrar(nome, email, senha) {
  const resultado = await db.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id",
    [nome, email, senha]
  );
  return resultado.rows[0].id;
}

// Buscar usuário por email
async function buscarPorEmail(email) {
  const resultado = await db.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  return resultado.rows[0];
}

// Editar usuário
async function editar(id, nome, senha) {
  const resultado = await db.query(
    "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4",
    [nome, email, senha, id]
  );
  return resultado.rowCount > 0; 
}

// Deletar usuário
async function deletar(id) {
  const resultado = await db.query(
    "DELETE FROM usuarios WHERE id = $1",
    [id]
  );
  return resultado.rowCount > 0; 
}

module.exports = { cadastrar, buscarPorEmail, editar, deletar };
