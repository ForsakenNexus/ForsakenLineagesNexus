const races = require('./races');

function processFeeding(race, currentResource, amount) {
    let newAmount = currentResource + amount;
    if (newAmount > 100) newAmount = 100;
    if (newAmount < 0) newAmount = 0;
    return newAmount;
}

function ageUp(currentAge) {
    return currentAge + 1;
}

module.exports = { processFeeding, ageUp };