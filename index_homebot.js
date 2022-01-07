// Bot is used for:
// - Use .help or .info for showing commands
// - shutdown the Dell R720 Server
// - start the Dell R720 Server
// - status of the Dell R720 Server -> Power Status + Powerusage
// - Shutdown PC via User
// - Start PC via WOL

// Last Update: 07.01.2022

const {Client,Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const token = 'XXX'; // Replace the XXX in Token wit your token from your bot
const {exec} = require("child_process");

client.on('ready', () => {
    console.log('Launched!');
    // Replace XXXXX with Channelname from your Discord Server
    client.channels.cache.find(channel => channel.name === 'XXXXXX').send("Bot Started Successfully")
});

client.on('messageCreate', message => {
    if (message.content === '.info') {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('HomeBot - Online')
        .setDescription('Hello im the Bot, how can i help you?')
        .addFields(
            { name: 'Start the Server', value: '.serveron' },
            { name: 'Soft Shutdown the Server', value: '.serveroff' },
            { name: 'Show Powerstate + Powerusage of Server', value: '.serverstatus' },
            { name: 'Shutdown the PC', value: '.pcoff' },
            { name: 'Clean up Discord Chat', value: '.clean' },
            { name: 'Restart the Bot', value: '.restart' },
        )
        .setTimestamp();
    
        message.channel.send({ embeds: [Embed] 
        });

    } else if (message.content === '.help') {
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('HomeBot - Online')
        .setDescription('Hello im the Bot, how can i help you?')
        .addFields(
            { name: 'Start the Server', value: '.serveron' },
            { name: 'Soft Shutdown the Server', value: '.serveroff' },
            { name: 'Show Powerstate + Powerusage of Server', value: '.serverstatus' },
            { name: 'Shutdown the PC', value: '.pcoff' },
            { name: 'Clean up Discord Chat', value: '.clean' },
            { name: 'Restart the Bot', value: '.restart' },
        )
        .setTimestamp();
    
        message.channel.send({ embeds: [Embed] 
        });

    } else if (message.content === '.serveron') {
        // Replace the IP, User & Password in ipmitool from your Server
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
        // Replace the IP, User & Password
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

    }else if (message.content === '.serverstatus') {
        message.channel.send('I found following infos:');
        // Replace the IP, User & Password
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
        // Replace the IP, User & Password
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

    } else if (message.content === '.pcon') {
        // need to install etherwake + which interface -i is used from the raspberry. The MAC from the PC is needed + you have to enable in the BIOS + WIN Settings WOL
        // example - sudo etherwake -i wlan0 XX:XX:XX:XX:XX:XX -> Raspberry try to use his own wifi adapter to send a WOL Package to the MAC Address
        exec("sudo etherwake -i INTERFACEXY XX:XX:XX:XX:XX:XX", (error, data, getter) => {
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

    } else if (message.content === '.pcoff') {
        // Replace IP with PC/Server IP. A User is needed to login and remotly shutdown.
        exec("net rpc -S XXX.XXX.XXX.XXX -U USER%PASSWORD shutdown -t 0 -f", (error, data, getter) => {
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
        message.channel.send('PC will be shutdown..');

    } else if (message.content === '.clean') {
        message.channel.bulkDelete(99, true).catch((err) => {
            console.error(err);
            message.channel.send(
                "there was an error trying to prune messages in this channel!");
        });

    } else if (message.content === '.restart') {  
        // create a Service for launching the bot, via this command you can restart the bot if some changes to the index Script was done.
        exec("sudo systemctl restart discord-bot.service", (error, data, getter) => {
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
        message.channel.send('Bot will be restarted...');
        const Embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('HomeBot - Online')
        .setDescription('Hello im the Bot, how can i help you?')
        .addFields(
            { name: 'Start the Server', value: '.serveron' },
            { name: 'Soft Shutdown the Server', value: '.serveroff' },
            { name: 'Show Powerstate + Powerusage of Server', value: '.serverstatus' },
            { name: 'Startet den PC', value: '.pcon' },
            { name: 'Shutdown the PC', value: '.pcoff' },
            { name: 'Clean up Discord Chat', value: '.clean' },
            { name: 'Restart the Bot', value: '.restart' },
        )
        .setTimestamp();
    
        message.channel.send({ embeds: [Embed] 
        });
}});

client.login(token);
