'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

// route categories/ 
//
router.get('/', function(req, res) {
  models.Category.findAll({
    attributes: ['description','id'],
    order: [
      ['description', 'ASC']
    ]
  }).then(function(categories) {
    res.render('./categories/index', {
      title: 'Categories list',
      categories: categories
    })
  })
})

// route categories/create
//
router.get('/create', (req, res) => {
    res.render('./categories/create', {
      title: 'Create category',
      category: ['description'],
      errors: ''
    })
})

// route categories/edit/id
//
router.get('/edit/:category_id', (req, res) => {
    var id =  req.params.category_id
    models.Category.findById(
      id
    ).then(function(category) {
      res.render('./categories/edit', {
        title: 'Edit category',
        category: category,
        errors: ''
      })
    })
})

// route categories/id/products
// get all products from a category
//
router.get('/:category_id/products', (req, res) => {
  var id =  req.params.category_id
  models.Category.find({
    where: {id: id},
    include: [{
      model: models.Product,
      attributes: ['number', 'description', 'image_url', 'price', 'id']
    }]
  }).then(function(data) {
    if(data === null) {
      res.render('./categories/products', {
        title: ` Category not found`,
        data: {
          description: 'not found',
          id: null,
          Products: []
        } 
      })
    } else {
      res.render('./categories/products', {
      title: ` Category: ${data.description}`,
      data: data
    })
    }
  })
})

// route categories/id/products/create
//
router.get('/:category_id/products/create', (req, res) => {
    var id =  req.params.category_id
    models.Category.find({
      where: {id: id},
      attributes: ['description','id']
    }).then( (category) => {
        res.render('./products/create', {
          data: { 
            "CategoryId": category.id
          },
          title: `Category: ${category.description} - Create Product`,
          errors: ''
        })
    })
})

// route categories/id/products/edit
//
router.get('/:category_id/products/edit/:product_id', (req, res) => {
    var id =  req.params.product_id
    models.Product.find({
      where: {id: id}
    }).then( (product) => {
      res.render('./products/edit', {
          data: product.dataValues,
          title: 'Edit Product',
          errors: ''
        })
    })
})

module.exports = router