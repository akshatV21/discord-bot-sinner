const { EmbedBuilder } = require("discord.js")

const event = {
  name: "guildMemberAdd",
  once: false,
  execute(member) {
    const memberAddEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("New Member joined!")
      .setDescription(`${member.user} has joined the server!\n Hope you like it here!`)
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp()

    const validChannelID = "1010931699682644030"
    member.guild.channels.cache.get(validChannelID).send({ embeds: [memberAddEmbed] })
  },
}

module.exports = event
