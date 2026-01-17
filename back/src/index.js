// back/src/index.js
const express = require('express');
const cors = require('cors');
const dbManager = require('./database/dbManager'); // <--- Importa aqui

const app = express();
app.use(express.json());
app.use(cors());

// Suas rotas aqui...
// app.post('/register', ...);

const PORT = 3000;

// Só inicia o servidor DEPOIS que o banco estiver pronto
dbManager.run().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Falha crítica ao iniciar:', err);
});