require("dotenv").config()
const { default: axios } = require("axios")
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

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

      const response = await axios.get(process.env.TRIVIA_API_URL)
      const trivia = await response.data.results[0]

      const { question, difficulty } = trivia
      const correctOption = trivia.correct_answer
      const options = getRandomlyPlacedOptions([...trivia.incorrect_answers, correctOption])

      const triviaEmbed = new EmbedBuilder()
        .setTitle("TRIVIA")
        .setDescription("Reply with the correct answer's options number only!!")
        .setFields({ name: "Difficulty", value: difficulty }, { name: "Question", value: `${question}` })
        .setFooter({ text: "You have 10 seconds to answer this question!!" })

      // setting up the embed
      options.forEach((option, index) => {
        triviaEmbed.addFields({ name: `${index + 1}) ${option}`, value: "----------------------" })
      })

      await interaction.reply({ embeds: [triviaEmbed], fetchReply: true })
      const filter = msg => msg.author.id === interaction.user.id
      const userReply = await channel.awaitMessages({ filter, time: 10000, max: 1, error: ["timeout!"] })
      const userAnswer = userReply.content

      const correctAnser = options.findIndex(option => option === correctOption)

      if (userAnswer === correctAnser) {
        interaction.followUp(`correct answer is: ${correctAnser}`)
      } else {
        interaction.followUp(`you got is wrong!`)
      }
    } catch (error) {
      console.log(error)
    }
  },
}

const getRandomlyPlacedOptions = optionsArray => {
  const randomIndexes = []
  const finalArray = []

  while (randomIndexes.length !== 4) {
    const randomIndex = Math.floor(Math.random() * optionsArray.length)
    if (randomIndexes.includes(randomIndex)) continue

    randomIndexes.push(randomIndex)
    finalArray.push(optionsArray[randomIndex])
  }

  return finalArray
}

module.exports = command
