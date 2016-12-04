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
            //Action
            switch(req.body.type){
                case 'channel_created':
                    console.log('new channel created event')
                    slackWriter.newChannelEvent(req.body.channel)
                    break;
            }

            res.send(req.body.challenge)
        } catch (error) {
            log.debug('Error event' +error)
            res.send({
                response: 404,
                message: 'Event problem'
            })
        }
})


module.exports = slackRoute;
