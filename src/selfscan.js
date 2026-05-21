// scan.js - Standalone Self Scan Handler
const ages = require('../data/ageshelper');
const database = require('./database');
const races = require('./races');
const utils = require('./utils');

async function handleScan(data) {
    const db = database.loadDB();
    const record = db[data.race] && db[data.race][data.key];

    if (record) {
        return {
            status: "OK",
            displayName: "Player", // We can improve this later
            uuid: data.key,
            race: data.race,
            currentNights: record.currentNights,
            ageName: record.ageName,
            ageBlurb: ages.getBlurb(record.currentNights),
            resource: record.resource,
            maxAspect: record.maxAspect,
            dailyToll: record.dailyToll,
            bloodline: "Unknown",
            clan: "None",
            house: "None",
            title: "None",
            sire: "Unknown",
            generation: 0
        };
    } else {
        const defaults = races.getRaceDefaults(data.race);
        const nights = 1;
        return {
            status: "NEW",
            displayName: "New Soul",
            uuid: data.key,
            race: data.race,
            currentNights: nights,
            ageName: ages.getAgeName(nights),
            ageBlurb: ages.getBlurb(nights),
            resource: defaults.resource || 10.0,
            maxAspect: ages.getMaxAspect(nights),
            dailyToll: ages.getDailyToll(nights),
            bloodline: "Unknown",
            clan: "None",
            house: "None",
            title: "None",
            sire: "Unknown",
            generation: 0
        };
    }
}

module.exports = { handleScan };