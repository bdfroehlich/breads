const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads.js')
const Baker = require('../models/baker.js')

// INDEX /breads
breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
      .then(foundBreads => {
          res.render('index', {
              breads: foundBreads,
              bakers: foundBakers,
              title: 'Index Page'
          })
      })
    })
})


// NEW
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
              //anonymous object with key "bakers" that we can pass into new.jsx
                bakers: foundBakers
            })
      })
})

// SHOW /breads/
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
      .then(foundBread => {
        console.log(foundBread)
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
      // console.log(deletedBread)
      res.status(303).redirect('/breads')
    })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
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

// //route to update baker for any breads that do not have a baker or baker is null
// breads.get('/data/update/baker', (req, res) => {
//   const validBakers = ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe'];
//   // use math.random to 
//   Bread.updateMany({baker: null}, {baker: validBakers[0]}).then(updatedBread => {
//     console.log(updatedBread);
//     res.redirect('/breads');
//   });
// })


module.exports = breads

