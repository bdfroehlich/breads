//** DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

//** CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
//connect to mongo database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)
const app = express()

//** MIDDLEWARE - needs to be above ROUTES - need to use resources in public folders before routes
app.set('views', __dirname + '/views')
    //telling the app what format to use
app.set('view engine', 'jsx')
    //creates the ability to render jsx files in the app
app.engine('jsx', require('express-react-views').createEngine())
    //looks for all static files in the public directory
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
    //override method for forms
app.use(methodOverride('_method'))


//** ROUTES
app.get('/', (req, res) => {
    res.send('<h1>Welcome to an Awesome App about Breads</h1>')
  })
  
// Point to breads controller
const breadsController = require('./controllers/breads_controller.js')
//path to get to breads controller
app.use('/breads', breadsController)

// Point to bakers controller 
const bakersController = require('./controllers/bakers_controller.js')
//path to bakers controller
app.use('/bakers', bakersController)

//** LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})

//** WILD CARD
app.get('*', (req, res) => {
    res.render('notfound')
  })