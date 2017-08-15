'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

// route tables/ 
//
// 
router.get('/', function(req, res) {
  models.Table.findAll({
    attributes: ['place','number','seats','id'],
    order: ['place', 'number']
  }).then(function(data) {
    res.render('./tables/index', {
      polyglot: res.polyglot,
      title: res.polyglot.t('views.tables.list'),
      tables: data
    })
  })
})

// route tables/create
//
router.get('/create', (req, res) => {
    res.render('./tables/create', {
      polyglot: res.polyglot,
      title: res.polyglot.t('views.tables.create'),
      table: ['description'],
      errors: ''
    })
})

// route tables/edit/id
//
router.get('/edit/:table_id', (req, res) => {
    var id =  req.params.table_id
    models.Table.findById(
      id
    ).then(function(table) {
      res.render('./tables/edit', {
        polyglot: res.polyglot,
        title: res.polyglot.t('views.tables.edit'),
        table: table,
        errors: ''
      })
    })
})

module.exports = router