//Servidor
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('✅ API de Receitas funcionando!');
});

const PORTA = 7000;
app.listen(PORTA, () => console.log(`🚀 Servidor rodando na porta ${PORTA}`));
