const dotenv = require('dotenv').config() // allows for environmental variables

const express = require('express');
const app = express();
const methodOverride = require('method-override');


/////////////////
// Mongoose
/////////////////

const mongoose = require('mongoose');
const Pattern = require('./models/patternSchema.js')
const e = require('express');
const { create } = require('./models/patternSchema.js');

/////////////////
// Routes
/////////////////

// route to add new pattern

app.post('/newpattern', (req, res) => {
    Pattern.create(req.body, (error, createdPattern) => {
        console.log(createdPattern)
    })
})

app.get('/getpatterns', (req, res) => {
    const requestSize = req.body.size
    Pattern.aggregate([{ $sample: { size: 1 } }]).exec((error, foundPatterns) => {
        if (err) {
            console.log(err)
        }
        res.json(foundPatterns)
    })
})