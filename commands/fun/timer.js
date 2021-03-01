const Discord = module.require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');


module.exports = {
  name: "timer",
  category: "fun",
  run: async (client, message, args) => {
const Timer = args[0]
    if(isNaN(Timer)) return message.reply("heh, text time huh? How about **no**?")
    if (ms(Timer) > 2147483647) return message.reply("I won't get better like this")
    if(ms(Timer) < 1) return message.reply("What's the point of that?")
  
    if(!args[0]){
      return message.channel.send(":x: " + "| Please Enter a time period followed by \"s or m or h\"");
    }
  
    if(args[0] <= 0){
      return message.channel.send(":x: " + "| Please Enter a time period followed by \"s or m or h\"");
    }
  
    message.channel.send(":white_check_mark: " + "| Timer Started for: " + `${ms(ms(Timer), {long: true})}`)
  
    setTimeout(function(){
      message.channel.send(message.author.toString() + ` The Timer Has FINISHED!, it lasted: ${ms(ms(Timer), {long: true})}`)
    }, ms(Timer));
  }
}