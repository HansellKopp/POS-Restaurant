'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

router.get('/', function(req, res) {
    res.render('index', {
     title: res.polyglot.t('nav.app_name'),
     polyglot: res.polyglot
    })
})

router.get('/init-database', (req, res) => {
    // Initialize sequelize and drop the database before reconstructing it the (force: true)
    models.sequelize.sync({force:true}).then(function() {
        console.log('Database Initialized')
    })
    res.redirect('/')
})

module.exports = router
