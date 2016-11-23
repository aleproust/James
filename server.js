'use strict'
let bodyParser = require('body-parser')
let conf = require('./config/config-socket')
let server_port = conf.port

//let server_ip_address = conf.ipAdress

let express = require('express')
let routeSlack = require('./routes/slack')
let slackApi = require('./slack/slack-api')
let app = express()


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  console.log(req.url)
  return next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//--- Init routes --
app.use('/slack', routeSlack)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(server_port)





