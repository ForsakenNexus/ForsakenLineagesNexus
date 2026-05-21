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

app.post('/nexus', function(req, res) {
    const data = req.body;
    let db = database.loadDB();
    
    if (!utils.isValidRace(data.race)) {
        res.json({status: "ERROR", message: "Unknown Aspect"});
        return;
    }
    
    if (!db[data.race]) db[data.race] = {};
    
    if (data.action === "save") {
        const nights = parseInt(data.currentNights) || 1;
        
        db[data.race][data.key] = {
            currentNights: nights,
            ageName: ages.getAgeName(nights),
            maxAspect: ages.getMaxAspect(nights),
            dailyToll: ages.getDailyToll(nights),
            resource: data.resource,
            stats: data.stats,
            inventory: data.inventory || [],
            lastUpdated: utils.generateTimestamp()
        };
        
        database.saveDB(db);
        res.json({status: "OK", message: "Soul bound to the Nexus"});
    } 
    else if (data.action === "load" || data.action === "scan") {
        const record = db[data.race] && db[data.race][data.key];
        
        if (record) {
            res.json({
                status: "OK",
                currentNights: record.currentNights,
                ageName: record.ageName,
                maxAspect: record.maxAspect,
                dailyToll: record.dailyToll,
                resource: record.resource,
                stats: record.stats,
                inventory: record.inventory,
                blurb: ages.getBlurb(record.currentNights)
            });
        } else {
            // New player
            const defaults = races.getRaceDefaults(data.race);
            const nights = 1;
            
            res.json({
                status: "NEW",
                defaults: defaults,
                currentNights: nights,
                ageName: ages.getAgeName(nights),
                maxAspect: ages.getMaxAspect(nights),
                dailyToll: ages.getDailyToll(nights),
                blurb: ages.getBlurb(nights)
            });
        }
    } 
    else if (data.action === "feed") {
        const nights = parseInt(data.currentNights) || 1;
        const currentResource = parseFloat(data.resource) || 0;
        const amount = parseFloat(data.amount) || 0;
        
        const newResource = mechanics.processFeeding(data.race, currentResource, amount, nights);
        
        res.json({
            status: "OK",
            newResource: newResource,
            maxAspect: ages.getMaxAspect(nights),
            ageName: ages.getAgeName(nights)
        });
    } 
    else {
        res.json({status: "ERROR", message: "Unknown action"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Nexus Backend Awakens — Listening on port " + PORT);
});