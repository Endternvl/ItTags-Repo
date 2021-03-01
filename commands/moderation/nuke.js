const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "nuke",
    description: "Nukes a given channel",
    category: "moderation",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You do not have the perms to use this cmd!")
        }
        let reason = args.join(" ") || "None"
        if(!message.channel.deletable) {
            return message.reply("This channel cannot be nuked! why did you do this?")
        }
        let newchannel = await message.channel.clone()
        await message.channel.delete()
        let embed = new MessageEmbed()
        .setTitle("Channel Nuked :boom:")
        .setDescription(reason)
        .setImage('https://i.imgur.com/c9X7Pyn.gif')
        await newchannel.send(embed)
    }
}