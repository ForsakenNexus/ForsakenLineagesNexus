require('dotenv').config();
const express = require('express');
const cors = require('cors');

const database = require('./database');
const races = require('./races');
const mechanics = require('./mechanics');
const utils = require('./utils');
const ages = require('../data/ageshelper');

const app = express();
app.use(express.json());
app.use(cors());

// ... your requires stay the same ...

app.post('/nexus', function(req, res) {
    const data = req.body;
    let db = database.loadDB();
    
    if (!utils.isValidRace(data.race)) {
        res.json({status: "ERROR", message: "Unknown Aspect"});
        return;
    }
    
    if (!db[data.race]) db[data.race] = {};

    if (data.action === "save") {
        // your existing save code...
    } 
    else if (data.action === "load" || data.action === "scan") {
        const record = db[data.race] && db[data.race][data.key];
        
        if (record) {
            res.json({
                status: "OK",
                displayName: "Player Name",           // We can pull real name later
                uuid: data.key,
                race: data.race,
                currentNights: record.currentNights,
                ageName: record.ageName,
                ageBlurb: ages.getBlurb(record.currentNights),
                resource: record.resource,
                maxAspect: record.maxAspect,
                dailyToll: record.dailyToll,
                // Future fields
                bloodline: "Unknown",
                clan: "None",
                house: "None",
                title: "None",
                sire: "Unknown",
                generation: 0,
                embraced: "Unknown"
            });
        } else {
            // NEW player
            const defaults = races.getRaceDefaults(data.race);
            const nights = 1;
            res.json({
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
                generation: 0,
                embraced: "Unknown"
            });
        }
    } 
    else if (data.action === "feed") {
        // your existing feed code...
    } 
    else {
        res.json({status: "ERROR", message: "Unknown action"});
    }
});