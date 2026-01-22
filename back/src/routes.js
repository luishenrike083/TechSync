// back/src/routes.js
const express = require('express');
const router = express.Router();
const prisma = require('./database/database');

// Rota de Teste
router.get('/', (req, res) => {
    res.json({ status: 'API TechSync Online', database: 'Prisma ORM' });
});

// === ROTAS DE USUÁRIOS (Login/Sistema) ===

// Listar todos
router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { links: true } // Traz os links do grafana juntos
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

// Criar Usuário
router.post('/users', async (req, res) => {
    try {
        const { username, password, email, number } = req.body;
        const newUser = await prisma.user.create({
            data: { username, password, email, number }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao criar usuário. Email ou User já existem?" });
    }
});

// === ROTAS DE CONTATOS (Agenda) ===

router.get('/contacts', async (req, res) => {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
});

router.post('/contacts', async (req, res) => {
    const { name, email, number } = req.body;
    const newContact = await prisma.contact.create({
        data: { name, email, number }
    });
    res.json(newContact);
});

module.exports = router;
