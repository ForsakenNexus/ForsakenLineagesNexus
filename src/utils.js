function generateTimestamp() {
    return new Date().toISOString();
}

function isValidRace(race) {
    const valid = ["Sanguivar", "Valgryn", "Hexari", "Feyrin", "Draevor"];
    for (let i = 0; i < valid.length; i++) {
        if (valid[i] === race) return true;
    }
    return false;
}

module.exports = { generateTimestamp, isValidRace };