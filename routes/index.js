'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

models.sequelize.sync()

router.get('/', function(req, res) {
  models.User.findAll({
    attributes: ['username','email','id']
  }).then(function(users) {
    res.render('index', {
      title: 'POS-Restaurants',
      users: users
    })
  })
})

module.exports = router
