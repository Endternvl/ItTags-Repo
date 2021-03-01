const { MessageCollector } = require('discord.js')

module.exports = {
    name: "kick",
    clientPerms: ['KICK_MEMBERS'],
    perms: ['KICK_MEMBERS'],
    category: 'moderation',
    
    
    execute: async function(client, message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args[1]
        if(!reason) { let reason = 'No provided' }

        if(!member) return message.channel.send(`Mention a member!`)
        if(member.user.id === message.author.id) return message.channel.send(`You can\`t kick yourself!`)
        if(!member.kickable) return message.channel.send(`I can\`t kick that user!`)

        message.channel.send( { embed: { description: `\`[⏲20s]\` Are you sure you want kick ${member}? \`[yes/no]\``, color: 'YELLOW' } } )

        const collector = new MessageCollector(message.channel, msg => msg.author.id === message.author.id, {
            time: 20000
        })

        collector.on('collect', msg => {
            switch(msg.content) {
                case "yes":
                    message.delete()
                    member.kick(`Kicked by ${message.member.user.tag}, reason: ${reason}`)
                    .then(() => {
                        collector.stop('success');
                        return message.channel.send({embed:{description: `**Kicked \`${member.user.tag} (${member.user.id})\`**`, color: 'GREEN'}})
                    }).catch(err => {
                        collector.stop('success');
                        if (err) return message.channel.send(`Error`)
                    })
                break
                case "no":
                    message.delete()
                    message.channel.send(`Cancelled`)
                    collector.stop('success')
                break
                default:
                    message.delete()
                    message.channel.send(`Cancelled`)
                    collector.stop('success')
            }
            collector.stop('success')
        })
        collector.on('end', (ignore, error) => {
            if (error && error !== "success") {
                return message.channel.send('**Timed out**')
            };
            collector.stop('success')
        });
    }
}