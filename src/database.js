const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/nexusDB.json');

function loadDB() {
    if (fs.existsSync(DB_PATH)) {
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    }
    return {
        Sanguivar: {},
        Valgryn: {},
        Hexari: {},
        Feyrin: {},
        Draevor: {}
    };
}

function saveDB(db) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

module.exports = { loadDB, saveDB };