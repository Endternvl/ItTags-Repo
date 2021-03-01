const Discord = require ('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "announce",
aliases: ["", "a"],
category: "moderation",
usage: "embed <text to say>",
description: "Returns provided text in Embed form.",
run: async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATION")) return message.channel.send(`YOU DO NOT HAVE PERMISSION `)
 await message.delete()
  let say = message.content.split(" ").slice(1).join(" ")
  if(!say) return message.channel.send(`❌ | `+"I Cannot Repeat Blank Message")
  let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`${say}`)
  .setColor("RANDOM")
.setFooter(` ${message.guild}`)
.setTimestamp()
.setImage('https://cdn.discordapp.com/attachments/811066639579742249/813289145665323028/QClone_Title.png')
  message.channel.send(embed)
}
}