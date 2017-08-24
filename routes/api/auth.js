'use strict'

var moment = require('moment')
var models  = require('../../models')
var jwt  = require('jwt-simple')
var express = require('express')
var router  = express.Router()
var cookieParser = require('cookie-parser')

// validate user
router.post('/login', (req, res) => {
    models.User.find({
        where: {
            email: req.body.email,
            password: req.body.password,
        }
    }).then( (user) => {
      if(!user) {
        throw 'Invalid user'
      }
      const secret = req.app.get('jwtTokenSecret')
      var expires = moment().add(1,'days').valueOf()		
      var token = jwt.encode({
          iss: user.id,
          exp: expires
        }, 
        secret
      )				
      res.status(200)
        .cookie('token', 
          JSON.stringify({
            'token' : token,
            'expires' : expires,
            'user' : {'username': user.username, 'email': user.email}
          }))
        .json({'msg': 'valid user'})
    }).catch((err) => {
      if(err.errors) {
        res.status(500).json({'msg': err.errors})
      } else {
        res.status(500).json({'msg': err })
      }
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
     .status(200)
     .json({'msg': 'ok'})
})

module.exports = router