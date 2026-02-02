// back/src/index.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Importa suas rotas

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Usa as rotas
app.use('/', routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`➜ Teste em: http://localhost:${PORT}`);
});
