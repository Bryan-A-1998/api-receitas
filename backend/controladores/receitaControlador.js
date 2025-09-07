const receitaRepositorio = require('../repositorios/receitaRepositorio');

//Funções para receitas
// Cadastro de receitas
async function cadastrarReceita(req, res) {
  try {
    const { usuarioId, titulo, descricao, receitas } = req.body;

    if (!usuarioId || !titulo || !descricao) {
      return res.status(400).json({ mensagem: "Usuário, título, descrição e receitas são obrigatórios" });
    }

    if (!receitas || receitas.length === 0) {
      return res.status(400).json({ mensagem: "A receita deve conter ao menos um receita" });
    }

    const novaReceita = await receitaRepositorio.cadastrarReceita(usuarioId, titulo, descricao, receitas);

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
async function buscarReceitas(req,res) {
  try {
    const listaReceitas = await receitaRepositorio.buscarReceitas();

    if (!listaReceitas || listaReceitas.length === 0) {
      return res.status(404).json({ mensagem: "Receitas não encontrados"})
    }

    res.status(200).json({ mensagem: "Receitas encontrados", listaReceitas});

  } catch (erro){
    console.error("Erro ao buscar receitas:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar receitas" });
  }
  
}

async function buscarReceitaCompativel(req, res) {
  try {
    const { ingredientes } = req.body;

    if (!ingredientes || ingredientes.length === 0) {
      return res.status(400).json({ mensagem: "Lista de ingredientes é obrigatória" });
    }

    const resultado = await receitaRepositorio.buscarReceitaCompativel(ingredientes);

    if (
      (!resultado.completas || resultado.completas.length === 0) &&
      (!resultado.parciais || resultado.parciais.length === 0)
    ) {
      return res.status(404).json({ mensagem: "Nenhuma receita compatível encontrada" });
    }

    res.status(200).json({
      mensagem: "Receitas compatíveis encontradas",
      receitas_completas: resultado.completas,
      receitas_parciais: resultado.parciais
    });
  } catch (erro) {
    console.error("Erro ao buscar receitas compatíveis:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar receitas compatíveis" });
  }
}

// Editar receita (titulo e descricao)
async function editarReceita(req, res) {
  try {
    const { id, titulo, descricao } = req.body;

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