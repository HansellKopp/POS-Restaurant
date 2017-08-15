'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

// route users/ 
//
router.get('/', function(req, res) {
  models.User.findAll({
    attributes: ['username','email','id'],
    order: [
      ['username','ASC']
    ]
  }).then(function(users) {
      res.render('./users/index', {
      title: res.polyglot.t('views.users.list'),
      polyglot: res.polyglot,
      users: users
    })
  })
})

// route users/create
//
router.get('/create', function(req, res) {
    res.render('./users/create', {
      polyglot: res.polyglot,
      title: res.polyglot.t('views.users.create'),
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
        polyglot: res.polyglot,
        title: res.polyglot.t('views.users.edit'),
        user: user,
        errors: ''
      })
    })
})

module.exports = router