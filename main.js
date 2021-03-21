const Discord = require('discord.js');
const config = require("./config.json");
const prefix = config.Prefix;
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
const memberRoles = new Map([['members', '822693928100560906'], ['mod', '822697588892762112'], ['admin', '822912818202017932']]);
const channels = new Map([['welcome', '822695347074760704'],]);
//Collection of maps
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
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
    //https://discordjs.guide/command-handling/adding-features.html#required-arguments
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    //alisias
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return msg.reply('I dont know what you mean.');
    //check if command needs arguments
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${msg.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return msg.channel.send(reply);
    }

    //check if command is only avaiable in guild
    if (command.guildOnly && msg.channel.type === 'dm') {
        return msg.reply('I can\'t execute that command inside DMs!');
    }
    //check what permission is needed to excute the command
    if (command.permissions) {
        const authorPerms = msg.channel.permissionsFor(msg.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return msg.reply('You can not do this. No permission !');
        }
    }
    //check if command is on cooldown
    // const { cooldowns } = client;
    // if (!cooldowns.has(command.name)) {
    //     cooldowns.set(command.name, new Discord.Collection());
    // }
    // const now = Date.now();
    // const timestamps = cooldowns.get(command.name);
    // const cooldownAmount = (command.cooldown || 3) * 1000;
    // if (timestamps.has(msg.author.id)) {
    //     const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
    //     if (now < expirationTime) {
    //         const timeLeft = (expirationTime - now) / 1000;
    //         return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    //     }
    //     timestamps.set(message.author.id, now);
    //     setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    // }
    //execute command
    try {
        command.execute(msg, args, commandName, client, Discord, memberRoles);
    } catch (err) {
        console.log(err);
    }

});


client.login(config.BOT_TOKEN);

