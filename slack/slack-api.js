let Slack = require('slack-node')
let token = require('../config/config-socket').tokenSlack
let https = require('https')
let webhookUri = ''
let slack = new Slack()
let to
slack.setWebhook(webhookUri)

function apiStart(){
    https.get()
}

function messageInSlack (text) {
  slack.webhook({
    channel: '#trello-board',
    username: 'LBJ',
    text: text
  }, function (err, response) {
    console.log(response)
  })
}

exports.messageInSlack = messageInSlack