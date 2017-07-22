'use strict'

var models  = require('../models')
var express = require('express')
var router  = express.Router()

// route orders/ 
//
router.get('/', function(req, res) {
  models.Order.findAll({
    order: [
      ['number', 'ASC']
    ],
    include: [
     { model: models.OrderDetail }
    ],
  }).then(function(orders) {
    res.render('./orders/index', {
      title: 'Orders list',
      orders: orders
    })
  })
})

// route orders/create
//
router.get('/create', (req, res) => {
    res.render('./orders/create', {
      title: 'Create order',
      order: ['description'],
      errors: ''
    })
})

// route orders/edit/id
//
router.get('/edit/:order_id', (req, res) => {
    var id =  req.params.order_id
    models.Order.find({
      where: {id: id},
      include: [{
      model: models.OrderDetail,
      attributes: ['number', 'description', 'image_url', 'price', 'id']
      }]
    }
    ).then(function(order) {
      res.render('./orders/edit', {
        title: 'Edit order',
        order: order,
        errors: ''
      })
    })
})


// route orders/id/products/create
//
router.get('/:order_id/products/create', (req, res) => {
    var id =  req.params.order_id
    models.Order.find({
      where: {id: id},
      attributes: ['description','id']
    }).then( (order) => {
        res.render('./products/create', {
          data: { 
            "OrderId": order.id
          },
          title: `Order: ${order.description} - Create Product`,
          errors: ''
        })
    })
})

// route orders/id/products/edit
//
router.get('/:order_id/products/edit/:product_id', (req, res) => {
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