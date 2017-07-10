'use strict'

var models  = require('../../models')
var express = require('express')
var router  = express.Router()

// retrieve all users
//
router.get('/', function(req, res) {
  models.User.findAll({
    attributes: ['username','email','id'],
    order: [
      ['username','ASC']
    ]
  })
    .then(function(users) {
        res.status(200).json({'users': users})
    })
    .catch(function(err){
        res.status(500).json({'msg': err})
    })
})

// add new user
router.post('/', function(req, res) {
  models.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
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

// remove user by id
router.delete('/:user_id', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
     res.status(500).json({'msg': err})
  })
})

// update user by id
router.put('/:user_id', function(req, res) {
  models.User.update(
    { 
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    },
    {
      fields: ['username', 'email', 'password'],
      where: {
        id: req.params.user_id
      }
    }
  ).then(function(data) {
    res.status(200).json({'data': data})
  }).catch(function(err){
    res.status(500).json({'msg': err.errors})
  })
})

module.exports = router