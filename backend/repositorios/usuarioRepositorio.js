const db = require('../configuracao/db');
const Usuario = require('../modelos/Usuario');

// Cadastra o usuário e retorna usuario
async function cadastrar(nome, email, senha) {
  const resultado = await db.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id",
    [nome, email, senha]
  );
  const row = resultado.rows[0];
  return new Usuario(row.id, row.nome, row.email, row.senha);
}

// Buscar usuário por email
async function buscarPorEmail(email) {
  const resultado = await db.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  const row = resultado.rows[0] 
  return new Usuario(row.id, row.nome, row.email, row.senha);
}

// Editar usuário
async function editar(id, nome, senha) {
  const resultado = await db.query(
    "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4",
    [nome, email, senha, id]
  );
  const row = resultado.rows[0] 
  if (!row) return null;
  
  return new Usuario(row.id, row.nome, row.email, row.senha);
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
