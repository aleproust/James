var express = require('express');
var slackRoute = express.Router();
slackRoute.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

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


module.exports = slackRoute;