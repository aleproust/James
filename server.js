let bodyParser = require('body-parser')
let conf = require('./config/config-socket')
let server_port = conf.port

let server_ip_address = conf.ipAdress

let express = require('express')
let routeSlack = require('./routes/slack')
let slackApi = require('./slack/slack-api')
let app = express()
let http = require('http').Server(app)

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


app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// -- Start http server
http.listen(server_port, server_ip_address, function () {
    
  console.log('Listening on ' + server_ip_address + ', server_port ' + server_port)
})





