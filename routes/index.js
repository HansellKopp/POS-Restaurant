'use strict'

const models  = require('../models')
const express = require('express')
const router  = express.Router()

router.get('/', function(req, res) {
    res.render('index', {
     title: res.polyglot.t('nav.app_name'),
     polyglot: res.polyglot
    })
})

router.get('/login', (req, res) => {
    res.render('users/login', {
     title: res.polyglot.t('nav.login'),
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
