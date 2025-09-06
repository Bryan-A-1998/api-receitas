///rota
const express = require('express');
const router = express.Router();
const receitaControlador = require('../controladores/receitaControlador');

// Cadastro de receita
router.post('/', receitaControlador.cadastrarReceita);

// Busca de receitas
router.get('/', ingredienteControlador.buscarReceita);

// Busca de receitas compativeis
router.get('/receitasCompativeis', ingredienteControlador.buscarReceitaCompativel);

// Editar receita
router.put('/:id', ingredienteControlador.editarReceita);

// Deletar receita
router.delete('/:id', ingredienteControlador.deletarReceita);

module.exports = router;
