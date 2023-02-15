const dotenv = require('dotenv').config() // allows for environmental variables

const express = require('express');
const app = express();
const methodOverride = require('method-override');

const cors = require('cors');

/////////////////
// Mongoose
/////////////////

const mongoose = require('mongoose');
const Pattern = require('./models/patternSchema.js')
const { create } = require('./models/patternSchema.js');
const { default: axios } = require('axios');

/////////////////
// Middleware
/////////////////

// app.use(express.urlencoded({ extended: true }));// standard - this is just how you get url encoded data into JSON
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cors());

/////////////////
// Routes
/////////////////

// route to add new pattern

app.post('/newpattern', (req, res) => {
    // console.log(req.body)
    console.log(req.ip)

    axios.get('http://ip-api.com/json/' + req.ip).then((response) => {
        if (response.data.city) {
            req.body.city = response.data.city
        }
        if (response.data.country) {
            req.body.country = response.data.country
        }
        if (response.data.regionName) {
            req.body.region = response.data.regionName
        }
        Pattern.create(req.body, (error, createdPattern) => {
            res.json(createdPattern)
        })
    }
    ).catch((error) => {
        console.log(error)
        Pattern.create(req.body, (error, createdPattern) => {
            res.json(createdPattern)
        })
    })


})

// app.get('/getpatterns', (req, res) => { // 30 random patterns
//     const requestSize = req.body.size
//     Pattern.aggregate([{ $sample: { size: 30 } }]).exec((error, foundPatterns) => {
//         if (error) {
//             console.log(error)
//         }
//         res.json(foundPatterns)
//     })
// })

app.get('/getpatterns', (req, res) => { // 30 random patterns

    Pattern.find({}).sort({ updatedAt: -1 }).limit(30).exec((error, foundPatterns) => {
        if (error) {
            console.log(error)
        }
        res.json(foundPatterns)
    })
})


// mongoose.connect('mongodb://localhost:27017/microblog', () => { // offline connection for testing while offline
//     console.log('The connection with mongod local is established');
// })

mongoose.connect('mongodb+srv://gstar:' + process.env.MONGO_PASSWORD + '@cluster0.lrovc1s.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('The connection with mongoDB online is established');
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log("Hello Seattle, I'm listening");
});

