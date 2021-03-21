module.exports = {
    name: 'kick',
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
    description: 'kick a member of the guild',
    async execute(msg) {
        msg.reply('You have permission to kick members');
    }
}