// back/src/database/migration.js
const db = require('./connection');

async function up() {
    console.log('Rodando Migrations...');

    // 1. Tabela de Usuários
    const sqlUsuarios = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id VARCHAR(50) PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            senha VARCHAR(255) NOT NULL,
            telefoneCompleto VARCHAR(20),
            lastPasswordChangeDate DATETIME,
            passwordExpiryDays INT
        );
    `;

    // 2. Tabela de Contatos (Exemplo)
    const sqlContatos = `
        CREATE TABLE IF NOT EXISTS contatos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id VARCHAR(50),
            nome VARCHAR(100),
            numero VARCHAR(20),
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
        );
    `;

    try {
        await db.query(sqlUsuarios);
        await db.query(sqlContatos);
        console.log('Tabelas criadas com sucesso!');
    } catch (error) {
        console.error('Erro na Migration:', error);
    }
}

module.exports = { up };