/**
 * jwtauth
 *
 *  A simple middleware for parsing a JWt token attached to the request. If the token is valid, the corresponding user
 *  will be attached to the request.
 */

var url = require('url')
var models = require('../models')
var jwt = require('jwt-simple');

module.exports = function(req, res, next){
	
	// Parse the URL, we might need this
	var parsed_url = url.parse(req.url, true)

	/**
	 * Take the token from:
	 * 
	 *  - the POST value access_token
	 *  - the GET parameter access_token
	 *  - the x-access-token header
	 *    ...in that order.
	 */
	var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];
	if (token) {
        var decoded = jwt.decode(token, req.app.get('jwtTokenSecret'))

        if (decoded.exp <= Date.now()) {
            res.status(401).end('Access token has expired')				
        }

        models.User.findAll({
            where: {
                id: req.params.user_id
            }
            }).then(function(user) {
            req.user = user
                return next()
            }).catch(function(err){
                return next(err)
            })
    } else {
        res.status(401).end('Authentication error')
    }

}