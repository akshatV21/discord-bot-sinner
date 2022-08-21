const { SlashCommandBuilder } = require("discord.js")

const command = {
  data: new SlashCommandBuilder().setName("ping").setDescription("replies with pong!!"),
  async execute(interaction) {
    const validChannelID = "1010918234419114056"
    const channelID = interaction.channelId
    if (validChannelID !== channelID) return

    await interaction.reply({ content: "pong 🏓🏓 !!" })
  },
}

module.exports = command
