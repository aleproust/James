'use strict'
let Slack = require('slack-node')
let token = require('../config/config-socket').tokenSlack
let https = require('https')
let log = require('../config/log-js')
let webhookUri = process.env.WEBHOOK_GENERAL
let tokenSlack = process.env.TOKEN_SLACK
let slack = new Slack(tokenSlack)

slack.setWebhook(webhookUri)

slack.api("users.list", function(err, response) {
  log.debug(response.members.length)
});


function messageInSlack(text) {
  slack.webhook({
    channel: '#general',
    username: 'LBJ',
    text: text
  }, function(err, response) {
    console.log(response)
  })
}

function postPublicMessage(channel, text) {
  slack.api('chat.postMessage', {
    text: text,
    channel: '#' + channel
  }, function(err, response) {
    console.log(response);
  });
}

/**
 *"channel": {
        "id": "C024BE91L",
        "name": "fun",
        "created": 1360782804,
        "creator": "U024BE7LH"
    }
 */
function newChannelEvent(channel) {
  let newChannelText = `Merci d'avoir crée ce channel, pensez à inviter des personnes qui pourraient être intéressées !`
  postPublicMessage(channel.name, newChannelText)

}


exports.newChannelEvent = newChannelEvent

