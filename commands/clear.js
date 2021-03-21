module.exports = {
    name: 'clear',
    description: 'clear/delete all messages',
    async execute(msg, args, Discord) {
        if (args[1] != null || isNaN(args[0]) || args[0] < 1 || args[0] > 100) {
            let embed = new Discord.MessageEmbed()
                .setColor('#e42643')
                .setTitle('Clear command examples (Cant delete more then 100)')
                .setDescription(`Delete 10 messages: !clear 10 \n`
                    + `Delete 100 messages: !clear 100 \n`);
            return await msg.channel.send(embed);
        } else {
            await msg.channel.messages.fetch({ limit: args[0] }).then(msgs => {
                msg.channel.bulkDelete(msgs);
            });
        }
    }
}