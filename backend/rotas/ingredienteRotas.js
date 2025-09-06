const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/ingredienteControlador');

// Cadastro de ingrediente
router.post('/', ingredienteControlador.cadastrar);

// Busca de ingrediente
router.get('/', ingredienteControlador.buscar);

// Editar ingrediente
router.put('/:id', ingredienteControlador.editar);

// Deletar ingrediente
router.delete('/:id', ingredienteControlador.deletar);

module.exports = router;
