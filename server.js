'use strict'
let bodyParser = require('body-parser')
let conf = require('./config/config-socket')
let log = require('./config/log-js')
let server_port = conf.port

//let server_ip_address = conf.ipAdress

let express = require('express')
let routeSlack = require('./routes/slack')
let slackApi = require('./slack/slack-api')
let app = express()
let SlackStrategy = require('passport-slack').Strategy;
let passport = require('passport');
const {CLIENT_ID, CLIENT_SECRET} = process.env
// setup the strategy using defaults
passport.use(new SlackStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    // optionally persist profile data
  }
));

app.use(passport.initialize())

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
// path to start the OAuth flow
app.get('/auth/slack', passport.authorize('slack'));
// OAuth callback url
app.get('/auth/slack/callback',
  passport.authorize('slack', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/slack/event')
);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT)

log.debug('Server listens on ' + process.env.PORT)





