const discord = require("discord.js");

module.exports = {
  name: "invite",
  category: "info",
  description: "Invite QClone Link!",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`Here is the invite link :smile:`)
    .setDescription(`[CLICK HERE](https://discord.com/api/oauth2/authorize?client_id=808606035978878997&permissions=8&scope=bot)`)
    .setColor("RANDOM")
    .setFooter(`Made by skaryey#5622`)
    .setTimestamp(message.timestamp = Date.now())
    .setImage('https://cdn.discordapp.com/attachments/811066639579742249/813289145665323028/QClone_Title.png')
    
    message.channel .send(embed)
    
  
  }
}