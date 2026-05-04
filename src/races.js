const defaultStats = {
    Sanguivar: { blood: 100, strength: 70, magic: 60, age: 0 },
    Valgryn:   { lunae: 100, strength: 85, magic: 40, age: 0 },
    Hexari:    { anima: 100, strength: 50, magic: 90, age: 0 },
    Feyrin:    { viridia: 100, strength: 55, magic: 80, age: 0 },
    Draevor:   { quintessence: 100, strength: 75, magic: 75, age: 0 }
};

function getRaceDefaults(race) {
    return JSON.parse(JSON.stringify(defaultStats[race] || defaultStats.Sanguivar));
}

module.exports = { getRaceDefaults };