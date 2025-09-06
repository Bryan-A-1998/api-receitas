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
app.get('/', (req, res) => {
    res.send('API de Receitas funcionando!');
});

    //rotas usuario
app.use('/usuarios',usuarioRotas);
    
    //rotas ingrediente
app.use('/ingredientes',usuarioRotas);

    //rotas receita
app.use('/receitas',usuarioRotas);

const PORTA = 7000;
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
