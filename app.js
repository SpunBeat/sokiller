const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const bluebird = require('bluebird')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const connection = 'mongodb://lugash-user:02f64ef10f@ds131312.mlab.com:31312/lugash'

// 1. Mongoose Configuration
mongoose.Promise = bluebird
bluebird.promisifyAll(mongoose)
mongoose.connect(connection, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })

// 2. Mongoose Hooks
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'Connected'))

// 3. Express configuration
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

// a) cors options
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:8000',
  ]
  const origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

// b) method override
app.use(methodOverride())

require('./api/models/users/users.model')
require('./api/models/users/users.routes')(app)

require('./api/services/Passport')()

// 4. API
const { Product, Order, Payment } = require('./api/models')
Product.init(app)
Order.init(app)
Payment.init(app)

// 5. Routes
app.use('/', express.static('public'))


app.listen(process.env.PORT || 8080, () => console.log('localhost:' + 8080))
