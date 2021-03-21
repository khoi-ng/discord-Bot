module.exports = {
    name: 'reactionroles',
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
    description: 'Sets up a reaction role message!',
    async execute(msg, args, cmd, client, Discord, memberRoles) {
        const channel = '822893987387146290';
        const crazybitch = msg.guild.roles.cache.find(role => role.name === "Crazy Bitch");
        const crazybitchEmoji = '😱';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a role !')
            .setDescription('Choose a role \n\n'
                + `Crazy Bitch: ${crazybitchEmoji}`);
        let messageEmbed = await msg.channel.send(embed);
        messageEmbed.react(crazybitchEmoji).then(() => message.react('🍇'));

        client.on('messageReactionAdd', async (reaction, user) => {
            //cache message if it is a partial/non chached (this is done with the fetch)
            if (reaction.message.partial) await reaction.message.fetch();
            //cache reaction if it is a partial/non chached
            if (reaction.partial) await reaction.fetch();

            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                switch (reaction.emoji.name) {
                    case crazybitchEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(crazybitch);
                        break;
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            // https://stackoverflow.com/questions/61151696/fetch-message-from-the-client-discord-js
            // The first version of fetching should work. Note however, that messageReactionAdd event is emitted only for messages that are cached by your bot. 
            // Cached messages are those that are received after you start up your bot, up to (by default) 200 messages per channel.

            // If you want to fetch only one specific message to receive reaction events for, 
            // this should work, as long as it's in a channel that you don't have to worry about 
            // mentioned earlier limit.

            // However, as you are using v12, there is a feature that allows to receive events 
            // for uncached structure called Partials (here is the guide page for it). If you enable partials, 
            // you can receive events for your message without the need to fetch it beforehand. 
            // Just remember that you receive only IDs this way, but with ability to fetch if needed.
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                switch (reaction.emoji.name) {
                    case crazybitchEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(crazybitch);
                        break;
                }
            }
        });

    }

}