require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/nexus', function(req, res) {
    res.json({status: "OK", message: "Backend is alive"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Nexus Backend Awakens — Listening on port " + PORT);
});