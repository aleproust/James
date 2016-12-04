'use strict'
let Slack = require('slack-node')
let token = require('../config/config-socket').tokenSlack
let https = require('https')
let webhookUri = process.env.WEBHOOK_GENERAL
let slack = new Slack()

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

/**
 *"channel": {
        "id": "C024BE91L",
        "name": "fun",
        "created": 1360782804,
        "creator": "U024BE7LH"
    }
 */
function newChannelEvent(channel){
  let newChannelText = `Merci d'avoir crée ce channel, pensez à inviter des personnes qui pourraient être intéressées !`
  slack.send({
    channel : `#${channel.name}`,
    username : 'LBJ',
    text: newChannelText
  })
  .then( result => {
    slack.send({
      channel : `#general`,
      username:'LBJ',
      text : 'Nouveau channel crée : #'+channel.name
    })
  })
  .catch(err => console.log('Error new channel event ' + err))

}


exports.newChannelEvent = newChannelEvent

