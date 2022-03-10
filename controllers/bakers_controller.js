// dependencies
const express = require('express')
//baker needs its on route / page
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

//end point to populate the seed data into the db and redirect to /breads route /bakers/data/seed 
baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})

// export
module.exports = baker                    