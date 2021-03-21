module.exports = {
    name: 'ping',
    guildOnly: false,
    description: 'this is a ping command',
    execute(msg) {
        msg.reply('Pong!');
    }
}