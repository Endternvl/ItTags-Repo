const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Make a suggestion and have the community vote",
    category: "moderation",
    usage: "suggest <suggestion>",
    run: async (client, message, args) => {
        let suggestion = args.slice(0).join(" ");
        let SuggestionChannel = message.guild.channels.cache.find(channel => channel.name === "suggestions");
        if (!SuggestionChannel) return message.channel.send("**Please create a channel named suggestions before using this command!**");
        const embed = new MessageEmbed()
            .setTitle("New Suggestion")
            .setDescription(suggestion)
            .setColor("GREEN")
            .setFooter(`${message.author.tag} | ID: ${message.author.id}`)
            .setTimestamp()
        SuggestionChannel.send(embed).then(msg => {
            msg.react("✅")
            msg.react("❌")
        message.channel.send("**Your suggestion has been sent :)**");
        });
    }
}