const Discord = require('discord.js');
const config = require("./config.json");
const prefix = "!";
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//Collection of maps
client.commands = new Discord.Collection();
const memberRoles = new Map([
    ['members', '822693928100560906'],
    ['mod', '822697588892762112'],
    ['admin', '822912818202017932'],
]);
const channels = new Map([
    ['welcome', '822695347074760704'],
]);

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot is online!');
});

client.on('guildMemberAdd', member => {
    let welcomeRole = member.guild.roles.cache.find(role => role.id === memberRoles.get('members'));
    member.roles.add(welcomeRole).catch(console.error);
    member.guild.channels.cache.get(channels.get('welcome')).send(`Welcome <@${member.user.id}>. Please read the rules in the rules channel!`);
});

client.on("message", async msg => {
    //bot redet nicht mit anderen Bots, Nachricht muss mit Prefix anfangen
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    //Prefix aus der Message rausnehmen
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
        case 'clear':
            if (msg.member != null && msg.member.roles.cache.has(memberRoles.get('admin'))) {
                client.commands.get('clear').execute(msg, args, Discord);
            } else {
                msg.reply('You have no permission for this command');
            }
            break;
        case 'rickroll':
            msg.reply('https://youtu.be/dQw4w9WgXcQ');
            break;
        case 'ping':
            client.commands.get('ping').execute(msg, args);
            break;
        case 'kick':
            if (msg.member.permissions.has('KICK_MEMBERS')) {
                msg.reply('You have permission to kick members');
            } else {
                msg.reply('You DONT have permission to kick members');
            }
            break;
        case 'sum':
            client.commands.get('sum').execute(msg, args);
            break;
        case 'reactionroles':
            client.commands.get('reactionroles').execute(msg, args, Discord, client);
            break;
        case 'date':
            var date = new Date(Date.now());
            msg.reply(`${days[date.getDay()]} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} :calendar_spiral:`);
            break;
        case 'time':
            var date = new Date(Date.now());
            msg.reply(`${date.getHours()}:${date.getMinutes()}:watch:`);
            break;
        case 'latency':
            const timeTaken = Date.now() - msg.createdTimestamp;
            msg.reply(`latency:satellite::${timeTaken}ms.`);
            break;
        case 'bitch':
            if (msg.member != null && msg.member.roles.cache.has(memberRoles.get('mod'))) {
                msg.reply(`I'm your ${command}!`);
            } else {
                msg.reply(`You're a ${command}!`);
            }
            break;
        default:
            msg.reply('I dont know what you mean.');
            break;
    }
});


client.login(config.BOT_TOKEN);

