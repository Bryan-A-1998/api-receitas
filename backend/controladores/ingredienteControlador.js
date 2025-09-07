const ingredienteRepositorio = require('../repositorios/ingredienteRepositorio');

//Funções para ingredientes
// Cadastro de ingredientes
async function cadastrarIngrediente(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ mensagem: "Nome é obrigatórios" });
    }

    const ingredienteExistente = await ingredienteRepositorio.buscarIngredientes(nome);
    if (ingredienteExistente) {
      return res.status(400).json({ mensagem: "Ingrediente já cadastrado" });
    }

    const ingredienteCadastrado = await ingredienteRepositorio.cadastrarIngrediente(nome);

    res.status(201).json({ mensagem: "Ingrediente cadastrado com sucesso", 
      ingrediente: {
        id: ingredienteCadastrado.id,
        nome: ingredienteCadastrado.nome
      }
     });
     
  } catch (erro) {
    console.error("Erro no cadastro de ingrediente:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar ingrediente" });
  }
}

// Buscar ingredientes
async function buscarIngredientes(req,res) {
  try {
    const listaIngredientes = await ingredienteRepositorio.buscarIngredientes();

    if (!listaIngredientes){
      return res.status(404).json({ mensagem: "Ingredientes não encontrados"})
    }

    res.status(200).json({ mensagem: "Ingredientes encontrados", listaIngredientes});

  } catch (erro){
    console.error("Erro ao buscar ingredientes:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar ingredientes" });
  }
  
}
// Editar ingrediente
async function editarIngrediente(req, res) {
  try {
    const { id, nome } = req.body;

    const ingredienteAtualizado = await ingredienteRepositorio.editar(id, nome);

    if (!ingredienteAtualizado) {
      return res.status(404).json({ mensagem: "Ingrediente não encontrado" });
    }

    res.status(200).json({ mensagem: "Ingrediente atualizado com sucesso", 
      ingrediente: {
        id: ingredienteAtualizado.id,
        nome: ingredienteAtualizado.nome
      }
    });
  } catch (erro) {
    console.error("Erro ao editar ingrediente:", erro);
    res.status(500).json({ mensagem: "Erro ao editar ingrediente" });
  }
}

// Deletar ingrediente
async function deletarIngrediente(req, res) {
  try {
    const { id } = req.params;

    const ingredienteDeletado = await ingredienteRepositorio.deletar(id);

    if (!ingredienteDeletado) {
      return res.status(404).json({ mensagem: "ingrediente não encontrado" });
    }

    res.status(200).json({ mensagem: "Ingrediente deletado com sucesso" });
  } catch (erro) {
    console.error("Erro ao deletar ingrediente:", erro);
    res.status(500).json({ mensagem: "Erro ao deletar ingrediente" });
  }
}

module.exports = { cadastrarIngrediente, buscarIngredientes, editarIngrediente, deletarIngrediente };