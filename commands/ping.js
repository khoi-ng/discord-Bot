module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    execute(msg, args) {
        msg.reply('Pong!');
    }
}