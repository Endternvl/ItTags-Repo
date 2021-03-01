const { Client, Message, MessageEmbed } = require("discord.js");
const sourcebin = require('sourcebin_js')

module.exports = {
    name: 'sourcebin',
    commands: ['bin', 'source', 'src'],
    description: 'Post your code to source bin using this command!',
    category: 'info',
    run: async ({ message, client, args }) => {
    if (!args.join(' ')) return message.reply('**Please give a random code bruh! how did you post a code without code? use brain 🧠**')

      sourcebin.create([{
      name: `Code by ${message.author.tag}`,
      content: args.join(' '),
      languageId: 'js'
    }])
      .then(src => {
           message.channel.send(src.url)
    })
  .catch(e => {
         message.channel.send(`Error, try again later`)
   });
 }
}