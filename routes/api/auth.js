'use strict'

var moment = require('moment')
var models  = require('../../models')
var jwt  = require('jwt-simple')
var express = require('express')
var router  = express.Router()

// validate user
router.post('/login', function(req, res) {
    models.User.find({
        where: {
            email: req.body.email,
            password: req.body.password,
        }
    }).then(function(user) {
      if(!user) {
        throw 'Invalid user'
      }
      const secret = req.app.get('jwtTokenSecret')
      var expires = moment().add(7,'days').valueOf()		
      var token = jwt.encode(
        {
          iss: user.id,
          exp: expires
        }, 
        secret
      )				
      res.setHeader('Set-Cookie',`access_token=${token}`)	
      res.status(200).json({
        token : token,
        expires : expires,
        user : {'username': user.username, 'email': user.email}
      })
  }).catch(function(err) {
    if(err.errors) {
      res.status(500).json({'msg': err.errors})
    } else {
      res.status(500).json({'msg': err })
    }
  })
})

module.exports = router