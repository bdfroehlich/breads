const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads.js')

// INDEX /breads
breads.get('/', (req, res) => {
    res.render('index',
      {
        breads: Bread,
        title: "My Index Page"
      }
    )
  // res.send(Bread)
})


// NEW /breads/new
breads.get('/new', (req, res) => {
  res.render('new')
})

// SHOW /breads/:arrayIndex
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('Show', {
      bread: Bread[req.params.arrayIndex],
      index: req.params.arrayIndex
    })
  } else {
    res.render('notFound')
  }
})

// CREATE /breads/
breads.post('/', (req, res) => {
  if(!req.body.name) {
    res.send('<h1>400 Error - Bread name is null</h1>')
    return
  }
  if (!req.body.image) {
    req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.push(req.body)
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