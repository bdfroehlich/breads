const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads.js')

// INDEX /breads
breads.get('/', (req, res) => {
  Bread.find()
      .then(foundBreads => {
          res.render('index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})


// NEW /breads/new
breads.get('/new', (req, res) => {
  res.render('new')
})

// SHOW /breads/:arrayIndex
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
          res.render('show', {
              bread: foundBread
          })
      })
})

// CREATE /breads/
breads.post('/', (req, res) => {
  if(!req.body.name) {
    res.send('<h1>400 Error - Bread name is null</h1>')
    return
  }
  if(!req.body.image) {
    req.body.image = undefined 
}
if(req.body.hasGluten === 'on') {
  req.body.hasGluten = true
} else {
  req.body.hasGluten = false
}
Bread.create(req.body)
res.redirect('/breads')
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  //setting the name, hasGluten, and image - but your req.body could have extra data - bad practice
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})


module.exports = breads