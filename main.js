const { Client } = require('discord.js-selfbot-v13');
const { Constants: { APIErrors }} = require('discord.js');
require('dotenv').config()
const Cooldown = new Set();
let mytimer;
let timer = false;

const client = new Client({
  disableEveryone: true
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

async function bump() {
  var channel = client.channels.cache.get(process.env.CHANNELID);
  console.log('Bumped Here! #-#-#');
  channel.sendTyping();
  await sleep(getRandomIntInclusive(2300, 10000));
  await channel.sendSlash(process.env.DISBOARD_BOT_ID, 'bump')
}

function startBumpTimer() {
  client.user.setStatus('invisible');
  mytimer = setInterval(bump, getRandomIntInclusive(7500000, 9601037));
}

client.on('ready', startBumpTimer);

client.on('message', message => {
    if (message.channel.id === process.env.CHANNELID && message.type === 'APPLICATION_COMMAND' && message.author.id === process.env.DISBOARD_BOT_ID && message.interaction.commandName === 'bump' && message.interaction.user.id != process.env.YourUserID) {
    console.log('Detected Bump! Resetting..');
    clearInterval(mytimer);
    startBumpTimer();
  }
});

client.login(process.env.TOKEN);
