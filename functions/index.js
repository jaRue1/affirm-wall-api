const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const {getAffirmations,postAffirmations} = require('./src/affirmations') // link to affirmations.js

const app = express();
app.use(cors());

// api points
app.get('/affirmations',getAffirmations)
app.post('/affirmations',postAffirmations)

//exporting app
exports.app = functions.https.onRequest(app)