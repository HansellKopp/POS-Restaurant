'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

// Initialize sequelize and drop the database before reconstructing it (the force: true)
models.sequelize.sync({force: true}).then(function() {
    console.log('Database Initialized');
});

router.get('/', function(req, res) {
    res.render('index', {
     title: 'POS-Restaurants',
    })
})

module.exports = router
