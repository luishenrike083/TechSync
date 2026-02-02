const express = require('express');
const router = express.Router();
const prisma = require('./database/database'); // Verifique se o caminho está certo

// Rota de Teste
router.get('/', (req, res) => {
    res.json({ status: 'API TechSync Online', database: 'Prisma ORM' });
});

// --- ROTA NOVA: BUSCAR APENAS LINKS DO USUÁRIO ---
router.get('/users/:id/links', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: { links: true } // Seleciona APENAS a tabela de links
        });

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        
        // Retorna direto o array de links para facilitar o front-end
        res.json(user.links);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar links" });
    }
});

// Buscar usuário pelo id (Mantive, útil para perfil)
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: { links: true }
        });
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
});

// CADASTRO
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, telefone } = req.body;
        const userExists = await prisma.user.findFirst({
            where: { OR: [{ email }, { username: nome }] }
        });

        if (userExists) {
            return res.status(400).json({ success: false, message: "Usuário ou Email já cadastrados." });
        }

        const newUser = await prisma.user.create({
            data: { 
                username: nome, 
                password: senha, 
                email: email, 
                number: telefone 
            }
        });
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Erro ao criar usuário." });
    }
});

// --- LOGIN (CORRIGIDO PARA RETORNAR ID) ---
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== senha) {
            return res.status(401).json({ success: false, message: "Credenciais inválidas." });
        }

        // AGORA RETORNA O ID TAMBÉM
        res.json({ 
            success: true, 
            id: user.id,        // <--- IMPORTANTE!
            nome: user.username 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
});

// Atualização de dados
router.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { password, number } = req.body; 

    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                ...(password && { password }), 
                ...(number && { number })     
            }
        });
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Erro ao atualizar dados." });
    }
});

// Criar Link (Para Admin ou Futuro uso)
router.post('/links', async (req, res) => {
    try {
        const { name, url, userId } = req.body;
        const newLink = await prisma.grafanaLink.create({
            data: {
                name,
                url,   
                userId: Number(userId)
            }
        });
        res.status(201).json({ success: true, link: newLink });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Erro ao criar link." });
    }
});

// Contatos
router.post('/contacts', async (req, res) => {
    try {
        const { name, email, number, message } = req.body;
        const newContact = await prisma.contact.create({
            data: { name, email, number, message }
        });
        res.status(201).json({ success: true, contact: newContact });
    } catch (error) {
        res.status(400).json({ success: false, message: "Erro ao enviar mensagem." });
    }
});

// Deletar Usuário (Limpa os links antes)
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Primeiro apaga os links vinculados a ele para não dar erro de chave estrangeira
        await prisma.grafanaLink.deleteMany({
            where: { userId: Number(id) }
        });

        const deletedUser = await prisma.user.delete({
            where: { id: Number(id) }
        });

        res.json({ success: true, message: "Usuário removido com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "Usuário não encontrado." });
        }
        res.status(500).json({ success: false, message: "Erro ao remover usuário." });
    }
});

module.exports = router;