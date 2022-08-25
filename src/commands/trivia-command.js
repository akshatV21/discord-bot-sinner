require("dotenv").config()
const { default: axios } = require("axios")
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { getRandomlyPlacedOptions } = require("../helpers/command-helpers")

const command = {
  data: new SlashCommandBuilder().setName("trivia").setDescription("asks the user trivia questions!!"),
  async execute(interaction) {
    try {
      const validChannelID = process.env.TRIVIA_CH_ID
      if (validChannelID !== interaction.channelId) {
        interaction.reply({ content: "❌ CANNOT USE THIS HERE ❌", ephemeral: true })
        return
      }

      const channel = interaction.guild.channels.cache.get(validChannelID)

      // fetching the question
      const response = await axios.get(process.env.TRIVIA_API_URL)
      const trivia = await response.data.results[0]

      // destructuring the question
      const { question, correct_answer, incorrect_answers } = trivia
      const options = getRandomlyPlacedOptions([...incorrect_answers, correct_answer])
      const correctOption = options.findIndex(option => option === correct_answer)

      // creating the question embed
      const triviaEmbed = new EmbedBuilder()
        .setTitle("TRIVIA")
        .setDescription("Reply with the correct answer's option number only!!")
        .setFields({ name: "Question", value: `${question}` })
        .setFooter({ text: "You have 15 seconds to answer this question!!" })

      // adding the options to the embed field
      options.forEach((option, index) => {
        triviaEmbed.addFields({ name: `${index + 1}) ${option}`, value: "----------------------" })
      })

      // sending the embed field
      await interaction.reply({ embeds: [triviaEmbed], fetchReply: true })

      // getting the user's answer/response
      const filter = msg => msg.author.id === interaction.user.id
      const userResponse = await channel.awaitMessages({ filter, time: 10000, maxMatches: 1, error: ["time", "maxMatches"] })
      const userAnswer = Number(userResponse.first().content) - 1

      if (userAnswer === correctOption) {
        interaction.followUp(`${interaction.user} You got the answer right!!`)
      } else {
        interaction.followUp(`${interaction.user} You missed the chance buddy!!\nCorrect answer was: ${correct_answer}`)
      }
    } catch (error) {
      console.log(`[ERROR] - ${error}`)
      interaction.followUp({
        content: "Internal server error!!",
        ephemeral: true,
      })
    }
  },
}

module.exports = command
