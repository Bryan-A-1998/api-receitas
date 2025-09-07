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

// Buscar todas as receitas
async function buscarReceitas() {
  const resultado = await db.query(`
    SELECT
      r.id AS receita_id,
      r.usuario_id,
      r.titulo,
      r.descricao,
      i.nome AS ingrediente_nome,
      ri.quantidade,
      ri.unidade
    FROM receitas r
    LEFT JOIN receita_ingredientes ri ON r.id = ri.receita_id
    LEFT JOIN ingredientes i ON ri.ingrediente_id = i.id
    ORDER BY r.id;
  `);

  const receitasMap = new Map();

  for (const row of resultado.rows) {
    const receitaId = row.receita_id;

    if (!receitasMap.has(receitaId)) {
      receitasMap.set(receitaId, {
        id: receitaId,
        usuario_id: row.usuario_id,
        titulo: row.titulo,
        descricao: row.descricao,
        ingredientes: [],
      });
    }

    if (row.ingrediente_nome) {
      receitasMap.get(receitaId).ingredientes.push({
        nome: row.ingrediente_nome,
        quantidade: row.quantidade,
        unidade: row.unidade,
      });
    }
  }

  return Array.from(receitasMap.values());
}

// Função auxiliar para verificar ingredientes nas receitas
async function buscarReceitasComIngredientes(receitaIds) {
  if (!receitaIds.length) return [];

  const query = `
    SELECT 
      r.id AS receita_id,
      r.usuario_id,
      r.titulo,
      r.descricao,
      i.nome AS ingrediente_nome,
      ri.quantidade,
      ri.unidade
    FROM receitas r
    JOIN receita_ingredientes ri ON r.id = ri.receita_id
    JOIN ingredientes i ON i.id = ri.ingrediente_id
    WHERE r.id = ANY($1)
    ORDER BY r.id
  `;

  const { rows } = await db.query(query, [receitaIds]);

  const receitasMapeadas = {};

  for (const row of rows) {
    const id = row.receita_id;

    if (!receitasMapeadas[id]) {
      receitasMapeadas[id] = {
        id,
        usuario_id: row.usuario_id,
        titulo: row.titulo,
        descricao: row.descricao,
        ingredientes: []
      };
    }

    receitasMapeadas[id].ingredientes.push({
      nome: row.ingrediente_nome,
      quantidade: row.quantidade,
      unidade: row.unidade
    });
  }

  return Object.values(receitasMapeadas);
}

// FUNCIONALIDADE Busca por receitas compativeis ou parciais
async function buscarReceitaCompativel(ingredientesIds = []) {
  if (ingredientesIds.length === 0) return { completas: [], parciais: [] };

  // Buscar receitas COMPLETAS (exatamente os ingredientes buscados)
  const completasQuery = await db.query(
    `
    SELECT r.id
    FROM receitas r
    JOIN receita_ingredientes ri ON r.id = ri.receita_id
    WHERE ri.ingrediente_id = ANY($1)
    GROUP BY r.id
    HAVING 
      COUNT(DISTINCT ri.ingrediente_id) = $2
      AND (
        SELECT COUNT(*) FROM receita_ingredientes WHERE receita_id = r.id
      ) = $2
    `,
    [ingredientesIds, ingredientesIds.length]
  );

  const completasIds = completasQuery.rows.map(r => r.id);

  // Buscar receitas PARCIAIS (tem pelo menos 1 ingrediente, mas não são completas)
  const parciaisQuery = await db.query(
    `
    SELECT DISTINCT r.id
    FROM receitas r
    JOIN receita_ingredientes ri ON r.id = ri.receita_id
    WHERE ri.ingrediente_id = ANY($1)
    `,
    [ingredientesIds]
  );

  const parciaisIds = parciaisQuery.rows
    .map(r => r.id)
    .filter(id => !completasIds.includes(id));

  return {
    completas: completasIds,
    parciais: parciaisIds
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

module.exports = { cadastrarReceita, buscarReceitas, buscarReceitasComIngredientes, buscarReceitaCompativel, editarReceita, deletarReceita };
