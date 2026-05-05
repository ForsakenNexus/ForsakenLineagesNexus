const ages = require('./data/ageshelper');
const races = require('./races');

// Process feeding for any race's Aspect
function processFeeding(race, currentResource, amount, currentNights) {
    const maxAspect = ages.getMaxAspect(currentNights);
    
    let newAmount = currentResource + amount;
    if (newAmount > maxAspect) newAmount = maxAspect;
    if (newAmount < 0) newAmount = 0;
    
    return Math.floor(newAmount);
}

// Apply the Daily Toll (called every night)
function applyDailyToll(race, currentResource, currentNights) {
    const toll = ages.getDailyToll(currentNights);
    let newAmount = currentResource - toll;
    if (newAmount < 0) newAmount = 0;
    
    return Math.floor(newAmount);
}

// Get full status for HUD / client
function getAspectStatus(race, currentResource, currentNights) {
    return {
        aspectKey: races.getAspectKey(race),   // "blood", "lunae", etc.
        current: Math.floor(currentResource),
        max: ages.getMaxAspect(currentNights),
        dailyToll: ages.getDailyToll(currentNights),
        ageName: ages.getAgeName(currentNights),
        blurb: ages.getBlurb(currentNights),
        ageNumber: ages.getAgeNumber(currentNights)
    };
}

// Advance nights (for testing or daily tick)
function advanceNights(currentNights, days = 1) {
    return currentNights + days;
}

module.exports = {
    processFeeding,
    applyDailyToll,
    getAspectStatus,
    advanceNights
};