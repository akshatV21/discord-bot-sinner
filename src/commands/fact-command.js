const { SlashCommandBuilder } = require("discord.js")
const facts = require("../data/facts")

const command = {
  data: new SlashCommandBuilder().setName("fact").setDescription("replies with a random fact!!"),
  async execute(interaction) {
    const validChannelID = process.env.FACTS_CH_ID
    const channelID = interaction.channelId

    if (validChannelID !== channelID) {
      interaction.reply({ content: "❌ CANNOT USE THIS HERE ❌", ephemeral: true })
      return
    }

    const randomIndex = Math.floor(Math.random() * facts.length)
    const fact = facts[randomIndex]

    interaction.reply(`${interaction.user}\nfact: ${fact.text}\nsource: ${fact.source}`)
  },
}

module.exports = command
