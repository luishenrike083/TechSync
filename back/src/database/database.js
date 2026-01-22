// Importa do local personalizado que o professor pediu
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

module.exports = prisma;
