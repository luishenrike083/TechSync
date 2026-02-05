const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  // 1. Busca o token no cabeçalho da requisição (Authorization: Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O header vem como "Bearer eyJhbGciOi...", então separamos para pegar só o token
  const [, token] = authHeader.split(' ');

  try {
    // 2. Verifica se o token é válido usando sua chave secreta (definida no .env)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Busca o usuário no banco para garantir que ele ainda existe
    // e para pegar o PLANO atualizado dele.
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário inválido.' });
    }

    // 4. Salva o usuário dentro da requisição (req)
    // É aqui que o checkPlan.js vai buscar o "req.user.plan" depois!
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;
