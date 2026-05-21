require('dotenv').config();
const express = require('express');
const cors = require('cors');

const database = require('./database');
const races = require('./races');
const mechanics = require('./mechanics');
const utils = require('./utils');
const ages = require('../data/ageshelper');
const selfscan = require('./selfscan');   // ← New standalone scan

const app = express();
app.use(express.json());
app.use(cors());

app.post('/nexus', async function(req, res) {
    const data = req.body;
    let db = database.loadDB();
    
    if (!utils.isValidRace(data.race)) {
        res.json({status: "ERROR", message: "Unknown Aspect"});
        return;
    }

    if (data.action === "scan") {
        const result = await scan.handleScan(data);
        res.json(result);
    }
    else if (data.action === "save") {
        // your existing save code here...
        const nights = parseInt(data.currentNights) || 1;
        db[data.race][data.key] = { /* ... */ };
        database.saveDB(db);
        res.json({status: "OK", message: "Soul bound to the Nexus"});
    } 
    else if (data.action === "load") {
        // your existing load code...
    } 
    else if (data.action === "feed") {
        // your existing feed code...
    } 
    else {
        res.json({status: "ERROR", message: "Unknown action"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Nexus Backend Awakens — Listening on port " + PORT);
});