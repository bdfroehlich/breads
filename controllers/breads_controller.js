const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads.js')

// INDEX
breads.get('/', (req, res) => {
    res.render('index',
      {
        breads: Bread,
        title: "My Index Page"
      }
    )
  // res.send(Bread)
})

// SHOW - can path to breads/# to get to a specific bread in our array of breads stored in models/breads.js
// breads.get('/:arrayIndex', (req, res) => {
//     //USE TERNARY OPERATOR TO GIVE AN ERROR IF THE SPECIFIED INDEX IS OUTSIDE OF THE BREAD ARRAY
//                 //    CONDITIONAL         ?       exprIfTrue : exprIfFalse (null is always false an index outside of the array is null)
//     res.send(Bread[req.params.arrayIndex] ? Bread[req.params.arrayIndex] : "INVALID INPUT" )
//   })

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  res.render('Show', {
    //req = the http request GET
    //arrayIndex = associated index of breads array that is clicked on
    bread: Bread[req.params.arrayIndex]
  })
})

module.exports = breads