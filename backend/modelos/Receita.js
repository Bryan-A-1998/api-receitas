class Receita {
  constructor(id, usuario_id, titulo, descricao) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.titulo = titulo;
    this.descricao = descricao;
  }
}
module.exports = Receita;