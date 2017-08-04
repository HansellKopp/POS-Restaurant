'use strict'

var models  = require('../../models')
var express = require('express')
var router  = express.Router()

// retrieve all Orders
//
router.get('/', function(req, res) {
  models.Order.findAll({
    include: [
     { model: models.OrderDetail }
    ],
  })
    .then(function(orders) {
        res.status(200).json({'orders': orders})
    })
    .catch(function(err){
        res.status(500).json({'msg': err})
    })
})

// add new Order with details
//
router.post('/', function(req, res) {
  models.Order.findOrCreate({
      where: {number: req.body.table}, 
    defaults: {number: req.body.table}
  }).then((s) => {
      const newId = s[0].dataValues.id
      models.OrderDetail.create({
        OrderId: newId,
        number: req.body.number,
        quantity: req.body.quantity,
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
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
})

// remove order by id
router.delete('/:order_id', function(req, res) {
  models.Order.destroy({
    where: {
      id: req.params.order_id
    }
  }).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
     res.status(500).json({'msg': err})
  })
})

// remove order by id
router.delete('/detail/:id', function(req, res) {
  models.OrderDetail.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
     res.status(500).json({'msg': err})
  })
})
// update order by id
router.put('/:order_id', function(req, res) {
  models.Order.update(
    { 
      number: req.body.number
    },
    {
      fields: ['number'],
      where: {
        id: req.params.order_id
      }
    }
  ).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
    res.status(500).json({'msg': err.errors})
  })
})

module.exports = router