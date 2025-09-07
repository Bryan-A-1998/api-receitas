const db = require('../configuracao/conexaoBD');
const Ingrediente = require('../modelos/Ingrediente');

// Cadastra o ingrediente e retorna
async function cadastrarIngrediente(nome) {
    const resultado = await db.query(
        "INSERT INTO ingredientes (nome) VALUES ($1) RETURNING id, nome",
        [nome]
    );
    const row = resultado.rows[0];
    return new Ingrediente(row.id, row.nome);
}

// Buscar ingredientes
async function buscarIngredientes() {
    const resultado = await db.query(
        "SELECT * FROM ingredientes"
    );
    return resultado.rows.map(row => new Ingrediente(row.id, row.nome));
}

// Buscar ingrediente por nome
async function buscarIngredientePorNome(nome) {
    const resultado = await db.query(
        "SELECT * FROM ingredientes WHERE nome = $1",
        [nome]
    );
    const row = resultado.rows[0];
    if (!row) return null;
    return new Ingrediente(row.id, row.nome);
}

// Editar ingrediente
async function editarIngrediente(id, nome) {
    const resultado = await db.query(
        "UPDATE ingredientes SET nome = $1 WHERE id = $2 RETURNING *",
        [nome, id]
    );
    const row = resultado.rows[0]
    if (!row) return null;
    return new Ingrediente(row.id, row.nome);
}

// Deletar ingrediente
async function deletarIngrediente(id) {
    const resultado = await db.query(
        "DELETE FROM ingredientes WHERE id = $1",
        [id]
    );
    return resultado.rowCount > 0;
}

module.exports = { cadastrarIngrediente, buscarIngredientes, buscarIngredientePorNome, editarIngrediente, deletarIngrediente };
