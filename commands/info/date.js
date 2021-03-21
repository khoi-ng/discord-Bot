const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
module.exports = {
    name: 'date',
    guildOnly: false,
    cooldown: 10,
    description: 'get current date',
    async execute(msg) {
        var date = new Date(Date.now());
        msg.reply(`${days[date.getDay()]} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} :calendar_spiral:`);
    }
}