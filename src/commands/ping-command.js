const { SlashCommandBuilder } = require("discord.js")

const command = {
  data: new SlashCommandBuilder().setName("ping").setDescription("replies with pong!!"),
  async execute(interaction) {
    await interaction.reply({ content: "pong 🏓🏓 !" })
  },
}

module.exports = command
