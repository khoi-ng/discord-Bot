module.exports = {
    name: 'latency',
    guildOnly: false,
    cooldown: 2,
    description: 'get current latency',
    async execute(msg) {
        const timeTaken = Date.now() - msg.createdTimestamp;
        msg.reply(`latency:satellite::${timeTaken}ms.`);
    }
}