const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

// Cadastro de usuário
router.post('/', usuarioControlador.cadastrar);

// Login de usuário
router.post('/login', usuarioControlador.login);

// Editar usuário
router.put('/:id', usuarioControlador.editar);

// Deletar usuário
router.delete('/:id', usuarioControlador.deletar);

// nao tem busca de usuarios no momento

module.exports = router;
