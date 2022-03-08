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
        //save the string that gets returned to a variable so we can use i
        const bakedBy = foundBread.getBakedBy()
        console.log(bakedBy)
        //do not need to pass the bakedBy variable in show we passed that variable directly to our show view below.
        //which means our show view has access to the entire foundBread object, 
        //which has our bakedBy instance method on it.
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
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      console.log(deletedBread)
      res.status(303).redirect('/breads')
    })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id) 
    .then(foundBread => { 
      res.render('edit', {
        bread: foundBread 
      })
    })
  .catch(err => {
    res.send('404')
  })
})

// UPDATE
breads.put('/:id', (req, res) => {
  //validation
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  //new true is a mongo option to return the data entered to the user
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})

//SEED DATA for testing
breads.get('/data/seed', (req, res) => {
  Bread.insertMany([
    {
      name: 'Rye',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'French',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
      name: 'Gluten Free',
      hasGluten: false,
      image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
    {
      name: 'Pumpernickel',
      hasGluten: true,
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    }
  ]).then(createdBreads => {
      console.log(createdBreads)
      res.redirect('/breads')
    })
})

//end ourte to update baker for any breads that do not have a baker or baker is null
breads.get('/data/update/baker', (req, res) => {
  const validBakers = ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe'];
  // use math.random to 
  Bread.updateMany({baker: null}, {baker: validBakers[0]}).then(updatedBread => {
    console.log(updatedBread);
    res.redirect('/breads');
  });
})


module.exports = breads

