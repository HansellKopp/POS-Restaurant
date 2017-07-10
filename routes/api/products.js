'use strict'

var models  = require('../../models')
var express = require('express')
var router  = express.Router()

// retrieve all products
//
router.get('/', function(req, res) {
  models.Product.findAll({
    attributes: ['number','description','price','image_url','id'],
    order: [
      ['description','ASC']
    ],
    include: [ models.Category ]
  })
    .then(function(products) {
        res.status(200).json({'products': products})
    })
    .catch(function(err){
        res.status(500).json({'msg': err})
    })
})

// remove product by id
router.delete('/:product_id', function(req, res) {
  models.Product.destroy({
    where: {
      id: req.params.product_id
    }
  }).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
     res.status(500).json({'msg': err})
  })
})

// update product by id
router.put('/:product_id', function(req, res) {
  models.Product.update(
    { 
        number: req.body.number,
        description: req.body.description,
        price: req.body.price,
        image_url: req.body.image_url,
    },
    {
      fields: ['number', 'description', 'price', 'image_url'],
      where: {
        id: req.params.product_id
      }
    }
  ).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
    res.status(500).json({'msg': err.errors})
  })
})

module.exports = router