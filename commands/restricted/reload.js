const fs = require('fs');
//https://discordjs.guide/command-handling/adding-features.html#reloading-commands
module.exports = {
    name: 'reload',
    permissions: 'ADMINISTRATOR',
    description: 'Reloads a command',
    execute(message, args) {
        if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
        const commandFolders = fs.readdirSync('./commands');
        //loop through the commands sub-folders and check whether the command file is in that folder or not
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));
        //remove file from cache
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];
        //load file again, add the freshly loaded command to client.commands
        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            //overwrite command from the commands collection
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    }
}