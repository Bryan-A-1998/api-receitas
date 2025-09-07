const db = require('../configuracao/conexaoBD');
const Usuario = require('../modelos/Usuario');

// Cadastra o usuário e retorna usuario
async function cadastrar(nome, email, senha) {
  const resultado = await db.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, senha",
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
  return row ? new Usuario(row.id, row.nome, row.email, row.senha) : null;
}

// Editar usuário
async function editar(id, nome, senha) {
  const resultado = await db.query(
    "UPDATE usuarios SET nome = $1, senha = $2 WHERE id = $3 RETURNING id, nome, email, senha",
    [nome, senha, id]
  );
  const row = resultado.rows[0] 
  return row ? new Usuario(row.id, row.nome, row.email, row.senha) : null;
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
