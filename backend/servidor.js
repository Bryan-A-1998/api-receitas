//Servidor
const express = require('express');
const app = express();

app.use(express.json());

//variaveis de rotas
const usuarioRotas = require('./rotas/usuarioRotas');
const ingredienteRotas = require('./rotas/ingredienteRotas');
const receitaRotas = require('./rotas/receitaRotas');

//rotas
    //rota teste servidor
app.get('/api', (req, res) => {
    res.send('API de Receitas funcionando!');
});

    //rotas usuario
app.use('/api/usuarios',usuarioRotas);
    
    //rotas ingrediente
app.use('/api/ingredientes',usuarioRotas);

    //rotas receita
app.use('/api/receitas',usuarioRotas);

const PORTA = 7000;
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
