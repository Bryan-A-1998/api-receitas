const db = require('../configuracao/conexaoBD');

// Cadastrar receita com ingredientes
async function cadastrarReceita(usuarioId, titulo, descricao, ingredientes = []) {
  //  Cadastrar a receita
  const receitaQuery = await db.query(
    "INSERT INTO receitas (usuario_id, titulo, descricao) VALUES ($1, $2, $3) RETURNING *",
    [usuarioId, titulo, descricao]
  );

  const receita = receitaQuery.rows[0];

  // Cadastrar os ingredientes relacionados
  for (const ing of ingredientes) {
    await db.query(
      "INSERT INTO receita_ingredientes (receita_id, ingrediente_id, quantidade, unidade) VALUES ($1, $2, $3, $4)",
      [receita.id, ing.id, ing.quantidade, ing.unidade]
    );
  }

  //  Retornar receita completa
  receita.ingredientes = ingredientes;
  return receita;
}

// Buscar todas as receitas (sem os ingredientes por enquanto)
async function buscarReceitas() {
  const resultado = await db.query("SELECT * FROM receitas");
  return resultado.rows;
}

// Buscar receitas compatíveis com base nos ingredientes
async function buscarReceitaCompativel(ingredientesIds = []) {
  if (ingredientesIds.length === 0) return [];

  // Receitas que tem todos os ingredientes fornecidos
  const receitasTodosQuery = await db.query(
    `
    SELECT r.*
    FROM receitas r
    JOIN receita_ingredientes ri ON r.id = ri.receita_id
    WHERE ri.ingrediente_id = ANY($1)
    GROUP BY r.id
    HAVING COUNT(DISTINCT ri.ingrediente_id) = $2
    `,
    [ingredientesIds, ingredientesIds.length]
  );

  const receitasComTodos = receitasTodosQuery.rows;

  // Receitas que tem pelo menos um ingrediente
  const receitasParciaisQuery = await db.query(
    `
    SELECT DISTINCT r.*
    FROM receitas r
    JOIN receita_ingredientes ri ON r.id = ri.receita_id
    WHERE ri.ingrediente_id = ANY($1)
    `,
    [ingredientesIds]
  );

  const receitasParciais = receitasParciaisQuery.rows;

  return {
    completas: receitasComTodos,
    parciais: receitasParciais
  };
}

// Editar receita (apenas título/descrição por enquanto)
async function editarReceita(id, titulo, descricao) {
  const resultado = await db.query(
    "UPDATE receitas SET titulo = $1, descricao = $2 WHERE id = $3 RETURNING *",
    [titulo, descricao, id]
  );
  return resultado.rows[0];
}

// Deletar receita 
async function deletarReceita(id) {
  const resultado = await db.query("DELETE FROM receitas WHERE id = $1", [id]);
  return resultado.rowCount > 0;
}

module.exports = { cadastrarReceita, buscarReceitas, buscarReceitaCompativel, editarReceita, deletarReceita };
