const ages = require('./data/ageshelper');
const races = require('./races');

// Process feeding for any race
function processFeeding(race, currentResource, amount, currentNights) {
    const maxAspect = ages.getMaxAspect(currentNights);
    let newAmount = currentResource + amount;
    
    if (newAmount > maxAspect) newAmount = maxAspect;
    if (newAmount < 0) newAmount = 0;
    
    return Math.floor(newAmount);
}

// Apply Daily Toll
function applyDailyToll(race, currentResource, currentNights) {
    const toll = ages.getDailyToll(currentNights);
    let newAmount = currentResource - toll;
    if (newAmount < 0) newAmount = 0;
    return Math.floor(newAmount);
}

// Get full status for HUD
function getAspectStatus(race, currentResource, currentNights) {
    return {
        aspectKey: races.getAspectKey(race),
        current: Math.floor(currentResource),
        max: ages.getMaxAspect(currentNights),
        dailyToll: ages.getDailyToll(currentNights),
        ageName: ages.getAgeName(currentNights),
        blurb: ages.getBlurb(currentNights),
        ageNumber: ages.getAgeNumber(currentNights),
        tickRate: ages.getTickRate(race),
        drainPerTick: ages.getDrainPerTick(race, ages.getAgeNumber(currentNights))
    };
}

module.exports = {
    processFeeding,
    applyDailyToll,
    getAspectStatus
};