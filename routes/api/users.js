'use strict'

var models  = require('../../models')
var express = require('express')
var router  = express.Router()

router.get('/', function(req, res) {
  models.User.findAll({
      attributes: ['username','email','id']
  })
    .then(function(users) {
        res.status(200).json({'users': users})
    })
    .catch(function(err){
        res.status(500).json({'msg': err})
    })
})

module.exports = router