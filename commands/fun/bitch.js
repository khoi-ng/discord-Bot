module.exports = {
    name: 'bitch',
    guildOnly: false,
    description: 'determinates if bot is your bitch',
    async execute(msg, args, cmd, client, Discord, memberRoles) {
        if (msg.member != null && msg.member.roles.cache.has(memberRoles.get('mod'))) {
            msg.reply(`I'm your ${cmd}!`);
        } else {
            msg.reply(`You're a ${cmd}!`);
        }
    }
}