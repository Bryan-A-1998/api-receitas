const express = require('express');
const router = express.Router();
const ingredienteControlador = require('../controladores/ingredienteControlador');

// Cadastro de ingrediente
router.post('/', ingredienteControlador.cadastrarIngrediente);

// Busca de ingrediente
router.get('/', ingredienteControlador.buscarIngredientes);

// Editar ingrediente
router.put('/:id', ingredienteControlador.editarIngrediente);

// Deletar ingrediente
router.delete('/:id', ingredienteControlador.deletarIngrediente);

module.exports = router;
