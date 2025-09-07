const receitaRepositorio = require('../repositorios/receitaRepositorio');

//Funções para receitas
// Cadastro de receitas
async function cadastrarReceita(req, res) {
  try {
    const { usuarioId, titulo, descricao, ingredientes } = req.body;

    if (!usuarioId || !titulo || !descricao) {
      return res.status(400).json({ mensagem: "Usuário, título, descrição e ingredintes são obrigatórios" });
    }

    if (!ingredientes || ingredientes.length === 0) {
      return res.status(400).json({ mensagem: "A receita deve conter ao menos um ingrediente" });
    }

    const novaReceita = await receitaRepositorio.cadastrarReceita(usuarioId, titulo, descricao, ingredientes);

    res.status(201).json({
      mensagem: "Receita cadastrada com sucesso",
      receita: novaReceita
    });
  } catch (erro) {
    console.error("Erro no cadastro da receita:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar receita" });
  }
}

// Buscar receitas
async function buscarReceitas(req, res) {
  try {
    const listaReceitas = await receitaRepositorio.buscarReceitas();

    if (!listaReceitas || listaReceitas.length === 0) {
      return res.status(404).json({ mensagem: "Receitas não encontrados" })
    }

    res.status(200).json({ mensagem: "Receitas encontrados", listaReceitas });

  } catch (erro) {
    console.error("Erro ao buscar receitas:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar receitas" });
  }

}

// Busca receita por ingrediente e diz se ta completa ou parcial de acordo com os ingredientes
async function buscarReceitaCompativel(req, res) {
  try {
    const { ingredientes } = req.body;

    if (!ingredientes || ingredientes.length === 0) {
      return res.status(400).json({ mensagem: "Lista de ingredientes é obrigatória" });
    }

    const resultado = await receitaRepositorio.buscarReceitaCompativel(ingredientes);

    if (resultado.completas.length === 0 && resultado.parciais.length === 0) {
      return res.status(404).json({ mensagem: "Nenhuma receita compatível encontrada" });
    }

    const completasDetalhadas = await receitaRepositorio.buscarReceitasComIngredientes(resultado.completas);
    const parciaisDetalhadas = await receitaRepositorio.buscarReceitasComIngredientes(resultado.parciais);

    return res.status(200).json({
      mensagem: "Receitas com ingredientes compatíveis encontradas",
      receitas_completas: completasDetalhadas,
      receitas_parciais: parciaisDetalhadas
    });

  } catch (erro) {
    console.error("Erro ao buscar receitas compatíveis:", erro);
    return res.status(500).json({ mensagem: "Erro ao buscar receitas compatíveis" });
  }
}

// Editar receita (titulo e descricao)
async function editarReceita(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    const receitaAtualizada = await receitaRepositorio.editarReceita(id, titulo, descricao);

    if (!receitaAtualizada) {
      return res.status(404).json({ mensagem: "receita não encontrado" });
    }

    res.status(200).json({
      mensagem: "receita atualizado com sucesso",
      receita: receitaAtualizada
    });
  } catch (erro) {
    console.error("Erro ao editar receita:", erro);
    res.status(500).json({ mensagem: "Erro ao editar receita" });
  }
}

// Deletar receita
async function deletarReceita(req, res) {
  try {
    const { id } = req.params;

    const receitaDeletado = await receitaRepositorio.deletarReceita(id);

    if (!receitaDeletado) {
      return res.status(404).json({ mensagem: "receita não encontrado" });
    }

    res.status(200).json({ mensagem: "receita deletado com sucesso" });
  } catch (erro) {
    console.error("Erro ao deletar receita:", erro);
    res.status(500).json({ mensagem: "Erro ao deletar receita" });
  }
}

module.exports = { cadastrarReceita, buscarReceitas, buscarReceitaCompativel, editarReceita, deletarReceita };