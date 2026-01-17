const migration = require('./migration');
const seeders = require('./seeders');
const db = require('./connection');

async function checkConnection() {
    // Tenta conectar por 30 segundos antes de desistir
    let retries = 5;
    while (retries) {
        try {
            await db.query('SELECT 1');
            console.log('🔌 Conectado ao MySQL!');
            return true;
        } catch (err) {
            console.log(`⏳ Aguardando MySQL... (${retries} tentativas restantes)`);
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000)); // Espera 5 segundos
        }
    }
    throw new Error('Não foi possível conectar ao banco de dados.');
}

async function run() {
    await checkConnection();
    await migration.up();
    await seeders.up();
}

module.exports = { run };