const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads.js')

// INDEX /breads
breads.get('/', (req, res) => {
  //.find() return a promise to so we can use .then on it
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
  //req.params.id = the id sent in the get req body
  //return form findByID would return null because it is a promise, need to use .then to render the page
  Bread.findById(req.params.id)
      .then(foundBread => {
        //show the bread
          res.render('show', {
              bread: foundBread
          })
      })
      .catch(err => {
        res.send('404')
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
  .catch(err => {
    res.send('404')
  })
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  //setting the name, hasGluten, and image - but your req.body could have extra data - bad practice
  Bread.updateOne(req.params.id)
  .then(() => res.redirect(`/breads/${bread.id}`))
})


module.exports = breads
