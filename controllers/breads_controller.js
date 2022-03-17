const express = require('express')
const breads = express.Router()
const Bread = require('../models/breads.js')
const Baker = require('../models/baker.js')

// INDEX /breads
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  //only grab the first 3 and return them.. don't have to grab the whole database then return the first 3
  const foundBreads = await Bread.find().limit(6).lean()
  // console.log(foundBreads)
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})



// NEW
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
              //anonymous object with key "bakers" that we can pass into new.jsx
                bakers: foundBakers,
                title: 'New Bread'
            })
      })
})

// SHOW /breads/
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
      .then(foundBread => {
        // console.log(foundBread)
          res.render('show', {
              bread: foundBread,
              title: foundBread.name
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
            // console.log(foundBread)
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers,
                title: `Edit ${foundBread.name}` 
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
//currently need to seed baker data before seeding breads
breads.get('/data/seed', (req, res) => {
  Baker.find().then(bakers => {
    console.log(bakers);
    bakers.forEach(b => {
      console.log(b.id);
      Bread.create({
        name: 'Rye',
        hasGluten: true,
        image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        baker: b.id
      });
    });
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

