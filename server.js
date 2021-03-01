const { default_prefix } = require("./config.json");
const { config } = require("dotenv");
const fetch = require("node-fetch");
const db = require("quick.db");
const moment = require("moment");
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
const discord = require("discord.js");
const client = new discord.Client();
const yts = require('yt-search')
const canvas = require("discord-canvas")
const welcomeCanvas = new canvas.Welcome
const a = "FF0000"

client.queue = new Map();
client.vote = new Map();
const { ready } = require("./handlers/ready.js")


require("./uptime.js");

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.on("message", async message => {
  
if(message.author.bot) return;
  if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  
  if(!message.content.startsWith(prefix)) return;
  
     if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
  
return addexp(message)

 })




client.on("message", async message => {
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`Hello! my prefix is \`${default_prefix}\``);
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

   let data = await canva.welcome(member, { link: "https://raw.githubusercontent.com/Endternvl/Images/main/Untitled.png" })
 
    const attachment = new discord.MessageAttachment(
      data,
      "qcxwelcome.png"
    );
    client.channels.cache.get(chx).send("Welcome to our server! glad you're here, " + member.user.username, attachment)
});




//chatbot

client.on("message", async message => {
if (message.channel.name == "chatbot") {
if (message.author.bot) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
if (message.content.includes(`@`)) {
return message.channel.send(`**:x: Please dont mention anyone**`);
 }
  message.channel.startTyping();
if (!message.content) return message.channel.send("Please say something.");
fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=skaryey#5622`)
    .then(res => res.json())
    .then(data => {
        message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
    });
      message.channel.stopTyping();
}
});

//LEVEL

const { addexp } = require("./handlers/xp.js")

//LEVEL
client.on("message", async message => {
if(message.author.bot) return;
  if(!message.guild) return;
  
return addexp(message)
})

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
 

const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: "./handlers/giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

client.on("message", async message => {
if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix =default_prefix;
  
  if(!message.content.startsWith(default_prefix)) return;
 
})

client.on("guildCreate", guild => {

  const { MessageEmbed } = require("discord.js");

  const ID = "787842689969684480";

  const channel = client.channels.cache.get(ID);

  const sowner = guild.owner.user;

  if (!channel) return;

  const embed = new MessageEmbed()

    .setTitle("**I Joined a Server!**")

    .addField(`**SERVER NAME**`, `\`\`\`${guild.name}\`\`\``)

    .addField(`**SERVER ID**`, `\`\`\`${guild.id}\`\`\``)

    .addField(`**SERVER OWNER**`, `\`\`\`${sowner.tag}\`\`\``)

    .addField(`**OWNER ID**`, `\`\`\`${sowner.id}\`\`\``)
 
    .addField(`**CREATED ON**`, `\`\`\`${guild.createdAt}\`\`\``)
  
    .addField(`**MEMBERS**`, `\`\`\`${guild.memberCount}\`\`\``)
  
    .setTimestamp()

    .setColor("32CD32")

    .setFooter(`Servers Count - ${client.guilds.cache.size}`);

  channel.send(embed);

});


// Set the bot's online/idle/dnd/invisible status
client.on("ready", () => {
    client.user.setStatus("online");
    console.log("QClone was ready to use!")
});

client.on("ready", () => {
  console.log(` ${client.user.username} online`);
  const status = [
    `#help | ItTags`,
    `#help | ${client.users.cache.size} Users`
    ]
  setInterval(() => {
    client.user.setActivity(status[Math.floor(Math.random() * status.length)], {type : "WATCHING"})
  }, 1000)
})

client.login(process.env.TOKEN);
