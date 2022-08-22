const event = {
  name: "guildMemberRemove",
  once: false,
  execute(member) {
    const validChannelID = "1010931699682644030"
    member.guild.channels.cache.get(validChannelID).send(`${member.user} has left the server!!`)
  },
}

module.exports = event
