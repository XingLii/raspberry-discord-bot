const {Client,Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const token = 'XXX'; // Token from Bot
const {exec} = require("child_process");

client.login(token);
client.on('ready', () => {
    console.log('Launched!'); 
    client.channels.cache.find(channel => channel.name === 'XXXXXX').send("HomeBot - Online"); 
});

client.on('message', message => {
    if (message.content === '.homebot') {
        message.channel.send('Hello im the HomeBot, how may i help?');
        message.channel.send('.help -> Show Commands');
		
    } else if (message.content === '.help') {
        message.channel.send('.serveron -> Start the Server');
        message.channel.send('.serveroff -> Soft Shutdown the Server');
        message.channel.send('.serverstatus -> Show Powerstate + Powerusage of Server');
		
    } else if (message.content === '.serveron') {
        exec("ipmitool -I lanplus -H XXX.XXX.XXX.XXX -U USER -P 'PASSWORD' power on", (error, data, getter) => {
            if (error) {
                console.log("error", error.message);
                return;
            }
            if (getter) {
                console.log("data", data);
                return;
            }
            console.log("data", data);
        });
        message.channel.send('Server got started, please wait...');
		
    } else if (message.content === '.serveroff') {
        exec("ipmitool -I lanplus -H XXX.XXX.XXX.XXX -U USER -P 'PASSWORD' power soft", (error, data, getter) => {
            if (error) {
                console.log("error", error.message);
                return;
            }
            if (getter) {
                console.log("data", data);
                return;
            }
            console.log("data", data);
        });
        message.channel.send('Server is shutting down, please wait...');
		
    } else if (message.content === '.serverstatus') {
        message.channel.send('I found following infos:');
        exec("ipmitool -I lanplus -H XXX.XXX.XXX.XXX -U USER -P 'PASSWORD' power status", (error, data, getter) => {
            if (error) {
                console.log("error", error.message);
                return;
            }
            if (getter) {
                console.log("data", data);
                return;
            }
            console.log("data", data);
            message.channel.send(data);
        });
        exec("ipmitool -I lanplus -H XXX.XXX.XXX.XXX -U USER -P 'PASSWORD' dcmi power reading", (error, data, getter) => {
            if (error) {
                console.log("error", error.message);
                return;
            }
            if (getter) {
                console.log("data", data);
                return;
            }
            console.log("data", data);
            message.channel.send(data);
        });
    }
});
