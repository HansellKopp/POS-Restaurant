'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

models.sequelize.sync()

router.get('/', function(req, res) {
    res.redirect('/users/')
    // res.render('index', {
    //  title: 'POS-Restaurants',
    // })
})

module.exports = router
