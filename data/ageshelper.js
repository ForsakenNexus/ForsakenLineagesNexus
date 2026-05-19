const agesData = require('./ages.json');
const feedingData = require('./racespecificfeeding.json');

function getAgeData(nights) {
    for (let age of agesData.ages) {
        if (nights >= age.minNights && nights <= age.maxNights) {
            return age;
        }
    }
    return agesData.ages[agesData.ages.length - 1];
}

// New feeding functions
function getTickRate(race) {
    return feedingData.tickRates[race] || 3.5;
}

function getDrainPerTick(race, age) {
    const rates = feedingData.drainRates[race] || feedingData.drainRates.Sanguivar;
    const value = rates[age - 1];
    return value === "Instant" ? "Instant" : value;
}

module.exports = {
    getAgeData,
    getAgeName: (n) => getAgeData(n).name,
    getMaxAspect: (n) => getAgeData(n).maxAspect,
    getDailyToll: (n) => getAgeData(n).dailyToll,
    getBlurb: (n) => getAgeData(n).blurb,
    getAgeNumber: (n) => getAgeData(n).age,
    getTickRate,
    getDrainPerTick
};