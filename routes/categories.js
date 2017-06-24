'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

router.get('/', function(req, res) {
  models.Category.findAll({
    include: [ models.Product ]
  }).then(function(categories) {
    res.render('categories', {
      title: 'Menu Categories',
      categories: categories
    })
  })
})

router.post('/create', function(req, res) {
  models.Category.create({
    description: req.body.description
  }).then(function() {
    res.redirect('/categories')
  }).catch(function(err) {
    res.status(500).json({'msg': err})
  })
})

router.delete('/:category_id', function(req, res) {
  models.Category.destroy({
    where: {
      id: req.params.category_id
    }
  }).then(function() {
    res.json(200,{'msg':'0'})
  })
})

router.post('/:category_id/product/create', function (req, res) {
  models.Product.create({
    description: req.body.description,
    CategoryId: req.params.category_id
  }).then(function() {
    res.redirect('/categories')
  }).catch(function(err) {
    res.status(500).json({'msg': err})
  })
})

router.delete('/:category_id/product/:product_id', function (req, res) {
  models.Product.destroy({
    where: {
      id: req.params.product_id
    }
  }).then(function() {
    res.redirect('/')
  })
})


module.exports = router
