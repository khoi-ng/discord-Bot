module.exports = {
    name: 'sum',
    description: 'this is a sum command',
    guildOnly: false,
    cooldown: 5,
    args: true,
    usage: '<number> <number>',
    execute(msg, args) {
        //neues Array erstellen das nur floats enthät
        const numArgs = args.map(x => parseFloat(x));
        //führt die Operation mehrfach auf jedes Element aus bis das Array leer ist
        const sum = numArgs.reduce((counter, x) => counter += x);
        //macht das gleiche
        //let sum = numArgs.reduce((a, b) => { return a + b;});
        msg.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
}