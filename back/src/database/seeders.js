// back/src/database/seeders.js
const db = require('./connection');

async function up() {
    console.log('Rodando Seeders...');

    const sqlInsert = `
        INSERT IGNORE INTO usuarios (id, nome, email, senha, telefoneCompleto, lastPasswordChangeDate, passwordExpiryDays) 
        VALUES ?
    `;

    // Seus dados antigos do db.json
    const values = [
        ['f1ee', 'luis', 'luis@gmail.com', 'luis', '+55 83982162814', '2025-11-24 03:53:00', 30],
        ['c381', 'hugo', 'hugo@gmail.com', '12345', '+55 83986519189', '2025-11-24 03:36:30', 30],
        ['d978', 'admin', 'admin@techsync.com', 'ykgg', '+55 8399999-9999', '2025-11-24 03:05:43', 60]
    ];

    try {
        await db.query(sqlInsert, [values]);
        console.log('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro no Seeder:', error);
    }
}

module.exports = { up };