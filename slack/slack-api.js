'use strict'
let Slack = require('slack-node')
let token = require('../config/config-socket').tokenSlack
let https = require('https')
let webhookUri = process.env.WEBHOOK_GENERAL
console.log(webhookUri)
let slack = new Slack()
let to
slack.setWebhook(webhookUri)

function messageInSlack (text) {
  slack.webhook({
    channel: '#general',
    username: 'LBJ',
    text: text
  }, function (err, response) {
    console.log(response)
  })
}

exports.messageInSlack = messageInSlack