'use strict'

var models  = require('../../models')
var express = require('express')
var router  = express.Router()
const Sequelize = require('sequelize')

// retrieve all tables
//
router.get('/', function(req, res) {
  models.Table.findAll({
      attributes: ['number','place', 'seats'],
      order: [
        ['place', 'ASC'],
        ['number', 'ASC']
      ]
  })
    .then(function(tables) {
        console.log(tables)
        res.status(200).json({'tables': tables})
    })
    .catch(function(err){
        res.status(500).json({'msg': err})
    })
})

// retrieve all places
//
router.get('/places', function(req, res) {
  models.Table.findAll({
      attributes: [
        [ Sequelize.fn('DISTINCT', Sequelize.col('place')) ,'place']
      ],
      order: [
        ['place', 'ASC']
      ]
  })
    .then(function(data) {
        res.status(200).json({'places': data})
    })
    .catch(function(err){
        console.log(err)
        res.status(500).json({'msg': err})
    })
})
// add new table
router.post('/', function(req, res) {
    console.log(req.body)
    models.Table.create({
        number: req.body.number,
        place: req.body.place,
        seats: req.body.seats
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

// remove table by id
router.delete('/:table_id', function(req, res) {
  models.Table.destroy({
    where: {
      id: req.params.table_id
    }
  }).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
     res.status(500).json({'msg': err})
  })
})

// update table by id
router.put('/:table_id', function(req, res) {
  models.Table.update(
    { 
      number: req.body.number,
      place: req.body.place,
      seats: req.body.seats
    },
    {
      fields: ['number', 'place', 'seats'],
      where: {
        id: req.params.table_id
      }
    }
  ).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
    res.status(500).json({'msg': err.errors})
  })
})

module.exports = router