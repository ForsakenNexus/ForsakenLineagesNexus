require('dotenv').config();
const express = require('express');
const cors = require('cors');

const database = require('./database');
const races = require('./races');
const mechanics = require('./mechanics');
const utils = require('./utils');

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
        db[data.race][data.key] = {
            age: data.age,
            resource: data.resource,
            stats: data.stats,
            inventory: data.inventory || [],
            lastUpdated: utils.generateTimestamp()
        };
        database.saveDB(db);
        res.json({status: "OK", message: "Soul bound to the Nexus"});
    } 
    else if (data.action === "load") {
        const record = db[data.race] && db[data.race][data.key];
        if (record) {
            res.json(record);
        } else {
            res.json({status: "NEW", defaults: races.getRaceDefaults(data.race)});
        }
    } 
    else {
        res.json({status: "ERROR", message: "Unknown action"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Nexus Backend Awakens — Listening on port " + PORT);
});