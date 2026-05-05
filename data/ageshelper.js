const agesData = require('./ages.json');

function getAgeData(nights) {
    for (let age of agesData.ages) {
        if (nights >= age.minNights && nights <= age.maxNights) {
            return age;
        }
    }
    return agesData.ages[agesData.ages.length - 1];
}

module.exports = {
    getAgeData,
    getAgeName: (n) => getAgeData(n).name,
    getMaxAspect: (n) => getAgeData(n).maxAspect,
    getDailyToll: (n) => getAgeData(n).dailyToll,
    getBlurb: (n) => getAgeData(n).blurb,
    getAgeNumber: (n) => getAgeData(n).age
};