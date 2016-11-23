'use strict'

var express = require('express');
var slackRoute = express.Router();


slackRoute.post('/welcome', function (req, res) {
        try {
            //Action
            res.send({
                response: 200,
                message: 'Client found'
            })
        } catch (error) {
            console.log('connected sockets')
            res.send({
                response: 404,
                message: 'Socket problem'
            })
        }
})


slackRoute.post('/eventSubscribe', function (req, res) {
        try {
            //Action
            res.send(req.body.challenge)
        } catch (error) {
            console.log('connected sockets')
            res.send({
                response: 404,
                message: 'Socket problem'
            })
        }
})


module.exports = slackRoute;