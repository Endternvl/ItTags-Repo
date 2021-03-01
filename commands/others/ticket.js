module.exports = {
  name: 'ticket',
  description: 'make a ticket channel',
  category: 'others',
  async execute(message, args, Discord) {
    message.delete().catch(err => console.log(err))
    let SupportTicket = await message.guild.channels.create(`${message.author.tag}`, {
      type: 'text',
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL']
        },
        {
          id: message.author.id,
          allow: ['VIEW_CHANNEL'],
        },
        

      ]
    });
    SupportTicket.send(`Hello <@${message.author.id}>! Support will be here shortly.`)
  }
}