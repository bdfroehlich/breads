// dependencies
const express = require('express')
//baker needs its own route / page
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

//end point to populate the seed data into the db and redirect to /breads route /bakers/data/seed 
baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})

// Index
baker.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

// Show
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate({
            path: 'breads',
            options: {limit: 3}
        })
        .then(foundBaker => {
            console.log(foundBaker)
            res.render('bakerShow', {
                baker: foundBaker,
                title: `${foundBaker.name}'s Page`
            })
        })
  })

// Delete
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id) 
      .then(deletedBaker => { 
        res.status(303).redirect('/breads')
      })
})

// export
module.exports = baker                    