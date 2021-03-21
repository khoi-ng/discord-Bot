module.exports = {
    name: 'time',
    guildOnly: false,
    cooldown: 5,
    description: 'get current time',
    async execute(msg) {
        var date = new Date(Date.now());
        msg.reply(`${date.getHours()}:${date.getMinutes()}:watch:`);
    }
}