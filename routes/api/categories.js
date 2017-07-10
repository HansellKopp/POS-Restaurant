'use strict'

var models  = require('../../models')
var express = require('express')
var router  = express.Router()

// retrieve all categories
//
router.get('/', function(req, res) {
  models.Category.findAll({
      attributes: ['description'],
      order: [
        ['description', 'ASC']
      ]
  })
    .then(function(categories) {
        res.status(200).json({'categories': categories})
    })
    .catch(function(err){
        res.status(500).json({'msg': err})
    })
})

// add new category
router.post('/', function(req, res) {
    models.Category.create({
        description: req.body.description
  }).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err) {
    if(err.errors) {
      res.status(500).json({'msg': err.errors})
    } else {
      res.status(500).json({'msg': err})
    }
  })
})

// remove category by id
router.delete('/:category_id', function(req, res) {
  models.Category.destroy({
    where: {
      id: req.params.category_id
    }
  }).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
     res.status(500).json({'msg': err})
  })
})

// update category by id
router.put('/:category_id', function(req, res) {
  models.Category.update(
    { 
      description: req.body.description
    },
    {
      fields: ['description'],
      where: {
        id: req.params.category_id
      }
    }
  ).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
    res.status(500).json({'msg': err.errors})
  })
})

// add new product into a category
router.post('/products', function(req, res) {
    models.Product.create({
        CategoryId: req.body.category_id,
        number: req.body.number,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price   
  }).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err) {
    if(err.errors) {
      res.status(500).json({'msg': err.errors})
    } else {
      res.status(500).json({'msg': err})
    }
  })
})

module.exports = router