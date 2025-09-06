class ReceitaIngrediente {
  constructor(id, receita_id, ingrediente_id, quantidade, unidade) {
    this.id = id;
    this.receita_id = receita_id;
    this.ingrediente_id = ingrediente_id;
    this.quantidade = quantidade;
    this.unidade = unidade;
  }
}
module.exports = ReceitaIngrediente;