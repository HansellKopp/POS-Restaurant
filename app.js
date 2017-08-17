'use strict'

const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      Polyglot = require('node-polyglot'),
      esTranslations = require('./resources/translations/es'),
      enTranslations = require('./resources/translations/en'),
      deTranslations = require('./resources/translations/de')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// load translations middleware
app.use(function(req, res, next) {
  let phrases = {}
  let currentLocale = req.headers["accept-language"] ? req.headers["accept-language"].substr(0,2) : 'en'
  switch(currentLocale) {
    case 'es':
      phrases = esTranslations
      break;
    case 'de':
      phrases = deTranslations
      break;
    default:
      phrases = enTranslations
      break;
  }
  res.polyglot = new Polyglot({
    phrases,
    currentLocale
  })
  next()
})

// frontend routes
//
const
  index = require('./routes/index'),
  users = require('./routes/users'),
  orders = require('./routes/orders'),
  tables = require('./routes/tables'),
  categories = require('./routes/categories')

app.use('/', index)
app.use('/users', users)
app.use('/tables', tables)
app.use('/categories', categories)
app.use('/Orders', orders)

// api routes
//
const
  usersApi = require('./routes/api/users'),
  tablesApi = require('./routes/api/tables'),
  ordersApi = require('./routes/api/orders'),
  productsApi = require('./routes/api/products'),
  categoriesApi = require('./routes/api/categories')

app.use('/api/users', usersApi)
app.use('/api/tables', tablesApi)
app.use('/api/orders', ordersApi)
app.use('/api/products', productsApi)
app.use('/api/categories', categoriesApi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
