///rota
const express = require('express');
const router = express.Router();
const receitaControlador = require('../controladores/receitaControlador');

// Cadastro de receita
router.post('/', receitaControlador.cadastrarReceita);

// Busca de receitas
router.get('/', receitaControlador.buscarReceita);

// Busca de receitas compativeis
router.post('/receitasCompativeis', receitaControlador.buscarReceitaCompativel);

// Editar receita
router.put('/:id', receitaControlador.editarReceita);

// Deletar receita
router.delete('/:id', receitaControlador.deletarReceita);

module.exports = router;
