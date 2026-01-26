
import prisma from './database/database.js'; 

router.get('/users', async (req, res) => {
    const usuarios = await prisma.user.findMany(); // O Prisma gera o SQL sozinho
    res.json(usuarios);
});
