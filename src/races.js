const raceAspectMap = {
    Sanguivar: "blood",
    Valgryn:   "lunae",
    Hexari:    "anima",
    Feyrin:    "viridia",
    Draevor:   "quintessence"
};

const defaultStats = {
    Sanguivar: { blood: 10, strength: 70, magic: 60, currentNights: 1 },
    Valgryn:   { lunae: 10, strength: 85, magic: 40, currentNights: 1 },
    Hexari:    { anima: 10, strength: 50, magic: 90, currentNights: 1 },
    Feyrin:    { viridia: 10, strength: 55, magic: 80, currentNights: 1 },
    Draevor:   { quintessence: 10, strength: 75, magic: 75, currentNights: 1 }
};

function getRaceDefaults(race) {
    return JSON.parse(JSON.stringify(defaultStats[race] || defaultStats.Sanguivar));
}

function getAspectKey(race) {
    return raceAspectMap[race] || "blood"; // fallback
}

module.exports = { 
    getRaceDefaults, 
    getAspectKey,
    raceAspectMap 
};