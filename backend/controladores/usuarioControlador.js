const usuarioRepositorio = require('../repositorios/usuarioRepositorio');

//Funções para usuarios
// Cadastro de usuário
async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: "Nome, email e senha são obrigatórios" });
    }

    const usuarioExistente = await usuarioRepositorio.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const usuarioCadastrado = await usuarioRepositorio.cadastrar(nome, email, senha);

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", 
      usuario: {
        id: usuarioCadastrado.id,
        nome: usuarioCadastrado.nome,
        email: usuarioCadastrado.email
      }
     });
  } catch (erro) {
    console.error("Erro no cadastro:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
}

// Login de usuário
async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }

    const usuario = await usuarioRepositorio.buscarPorEmail(email);

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ mensagem: "Senha incorreta, não foi possivel efetuar login" });
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso", 
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
     });
  } catch (erro) {
    console.error("Erro no login:", erro);
    res.status(500).json({ mensagem: "Erro ao realizar login" });
  }
}

// Editar usuário
async function editar(req, res) {
  try {
    const { id } = req.params;
    const { nome, senha } = req.body;

    const usuarioAtualizado = await usuarioRepositorio.editar(id, nome, senha);

    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json({ mensagem: "Usuário atualizado com sucesso",
      usuario: {
        id: usuarioAtualizado.id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email
      }
     });
  } catch (erro) {
    console.error("Erro ao editar usuário:", erro);
    res.status(500).json({ mensagem: "Erro ao editar usuário" });
  }
}

// Deletar usuário
async function deletar(req, res) {
  try {
    const { id } = req.params;

    const deletado = await usuarioRepositorio.deletar(id);

    if (!deletado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
  } catch (erro) {
    console.error("Erro ao deletar usuário:", erro);
    res.status(500).json({ mensagem: "Erro ao deletar usuário" });
  }
}

module.exports = { cadastrar, login, editar, deletar };