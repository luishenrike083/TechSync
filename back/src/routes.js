const express = require('express');
const router = express.Router();

// --- 1. CONFIGURAÇÕES NOVAS (Adicionei aqui) ---
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs'); // Biblioteca de criptografia
const jwt = require('jsonwebtoken'); // Biblioteca do Token

// Import dos Middlewares que criamos
const authMiddleware = require('./middlewares/auth');
const checkPlan = require('./middlewares/checkPlan');

// --- ROTA DE TESTE (Original) ---
router.get('/', (req, res) => {
    res.json({ status: 'API TechSync Online', database: 'Prisma ORM' });
});


// Listar todos
router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { links: true } // Traz os links do Grafana juntos
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});




// --- ROTA NOVA: AUTORIZAÇÃO POR PLANOS (Pedido do Professor) ---
// Apenas usuários com plano PRO ou ENTERPRISE podem acessar aqui
router.get('/monitoramento-avancado', 
    authMiddleware, 
    checkPlan(['PRO', 'ENTERPRISE']), 
    (req, res) => {
        res.json({ 
            message: "Acesso autorizado à área VIP!", 
            dados: "Gráficos de latência em tempo real..." 
        });
    }
);

// --- BUSCAR LINKS DO USUÁRIO (Original) ---
router.get('/users/:id/links', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: { links: true } 
        });

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        
        res.json(user.links);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar links" });
    }
});

// --- BUSCAR USUÁRIO PELO ID (Original) ---
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: { links: true }
        });
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
        
        // Dica de segurança: Removemos a senha antes de devolver os dados
        const { password, ...userSemSenha } = user;
        res.json(userSemSenha);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
});

// --- CADASTRO (Modificado para Criptografar Senha) ---
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha, telefone } = req.body;
        
        // 1. Verifica duplicidade
        const userExists = await prisma.user.findFirst({
            where: { OR: [{ email }, { username: nome }] }
        });

        if (userExists) {
            return res.status(400).json({ success: false, message: "Usuário ou Email já cadastrados." });
        }

        // 2. CRIPTOGRAFIA (A mudança principal está aqui)
        const hashedPassword = await bcrypt.hash(senha, 10);

        // 3. Cria com a senha segura
        const newUser = await prisma.user.create({
            data: { 
                username: nome, 
                password: hashedPassword, // Salva o hash, não a senha pura
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

// --- LOGIN (Modificado para usar Token e Verificar Hash) ---
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        // 1. Verifica se usuário existe
        if (!user) {
            return res.status(401).json({ success: false, message: "Credenciais inválidas." });
        }

        // 2. Verifica se a senha bate com a criptografia
        const isPasswordValid = await bcrypt.compare(senha, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Credenciais inválidas." });
        }

        // 3. GERA O TOKEN (Obrigatório para a autenticação)
        const token = jwt.sign(
            { id: user.id, plan: user.plan }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Retorna ID, Nome, Plano e o Token
        res.json({ 
            success: true, 
            id: user.id,
            nome: user.username, 
            plan: user.plan,
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro no servidor." });
    }
});

// --- ATUALIZAÇÃO DE DADOS (Original + Criptografia se mudar senha) ---
router.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { password, number } = req.body; 

    try {
        let dataToUpdate = {};
        
        // Se o usuário mandou telefone, atualiza
        if (number) dataToUpdate.number = number;

        // Se o usuário mudou a senha, TEM que criptografar de novo
        if (password) {
            dataToUpdate.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: dataToUpdate
        });
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Erro ao atualizar dados." });
    }
});

// --- CRIAR LINK (Original) ---
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

// --- CONTATOS (Original) ---
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

// --- DELETAR USUÁRIO (Original) ---
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
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
