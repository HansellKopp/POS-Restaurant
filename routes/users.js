'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

// update database schema
models.sequelize.sync()

// route users/ 
//
router.get('/', function(req, res) {
  models.User.findAll({
    attributes: ['username','email','id']
  }).then(function(users) {
    res.render('./users/index', {
      title: 'POS-Restaurants',
      users: users
    })
  })
})

// route users/create
//
router.get('/create', function(req, res) {
    res.render('./users/create', {
      title: 'POS-Restaurants - Create user',
      user: ['username','email','password'],
      errors: ''
    })
})

// route users/edit/id
//
router.get('/edit/:user_id', function(req, res) {
    var id =  req.params.user_id
    models.User.findById(
      id
    ).then(function(user) {
      res.render('./users/edit', {
        title: 'POS-Restaurants - Edit user',
        user: user,
        errors: ''
      })
    })
})

module.exports = router