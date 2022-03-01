//** DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')

//** CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

//** MIDDLEWARE - needs to be above ROUTES - need to use resources in public folders before routes
app.set('views', __dirname + '/views')
    //telling the app what format to use
app.set('view engine', 'jsx')
    //creates the ability to render jsx files in the app
app.engine('jsx', require('express-react-views').createEngine())
    //looks for all files in the public directory
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
    //override method for delete form install using npm install method-override
app.use(methodOverride('_method'))


//** ROUTES
app.get('/', (req, res) => {
    res.send('<h1>Welcome to an Awesome App about Breads</h1>')
  })
  
// Breads - we can require it because we exported breads in the breads_controller and put it in a new variable
const breadsController = require('./controllers/breads_controller.js')
//use app.use because we have it in another controller /breads is the path breadsController is the required controller path variable
app.use('/breads', breadsController)

//** LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})

//** WILD CARD
app.get('*', (req, res) => {
    res.render('notFound')
  })