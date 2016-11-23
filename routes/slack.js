'use strict'

let express = require('express');
let log = require('../config/log-js')
let slackWriter = require('../slack/slack-api')

let slackRoute = express.Router();


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


slackRoute.post('/event', function (req, res) {
        try {
            log.debug('Event Type' + _.get(req.body.type))
            //Action
            switch(req.body.type){
                case 'channel_created':
                    slackWriter.messageInSlack('Channel created')
                    break;
                default:
                    slackWriter.messageInSlack('Event not found')
            }
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