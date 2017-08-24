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

router.get('/init-database', (req, res) => {
    // Initialize sequelize and drop the database before reconstructing it the (force: true)
    models.sequelize.sync({force:true}).then(function() {
        models.User.bulkCreate([
            { username: 'super@pos.com', user_type: 'superuser', email: 'super@pos.com', password: 'super', createdAt: new Date(), updatedAt: new Date() },
            { username: 'admin@pos.com', user_type: 'admin', email: 'admin@pos.com', password: 'admin', createdAt: new Date(), updatedAt: new Date()},
            { username: 'user@pos.com', user_type: 'user', email: 'user@pos.com', password: 'user', createdAt: new Date(), updatedAt: new Date()}
        ])
        console.log('Database Initialized')
    })
    res.redirect('/')
})

module.exports = router
