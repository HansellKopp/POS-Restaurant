'use strict'

const models  = require('../models')
const jwtauth = require('../lib/jwtauth')
const express = require('express')
const router  = express.Router()

// auth middleware
router.use(jwtauth)
// route users/ 
//
router.get('/', function(req, res) {
  models.User.findAll({
    attributes: ['username','user_type','email','id'],
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
      user: ['username','user_type','email','password'],
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