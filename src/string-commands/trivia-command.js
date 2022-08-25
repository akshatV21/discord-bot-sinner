require("dotenv").config()
const { default: axios } = require("axios")
const { EmbedBuilder, MessageCollector } = require("discord.js")
const { getRandomlyPlacedOptions } = require("../helpers/command-helpers")

const stringCommand = {
  command: "?trivia",
  async execute(message) {
    // validating the command came from valid channel
    const validChannelID = process.env.TRIVIA_CH_ID
    if (validChannelID !== message.channelId) {
      interaction.reply({ content: "❌ CANNOT USE THIS HERE ❌", ephemeral: true })
      return
    }

    const channel = message.channel

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

    // sending the embed
    await channel.send({ embeds: [triviaEmbed] })

    // getting the user's answer/response
    const filter = msg => msg.author.id === message.author.id
    const collector = new MessageCollector(channel, { filter, time: 15000, max: 1 })

    // listening to events
    collector.on("collect", async msg => {
      const userAnswer = Number(msg.content) - 1

      if (userAnswer === correctOption) {
        message.reply(`${message.author} 👍 You got the answer right!! 👍`)
      } else {
        message.reply(`${message.author} ❌ You missed the chance buddy!! ❌\nCorrect answer was: ${correct_answer}`)
      }
    })

    collector.on("end", (collected, reason) => {
      if (collected.size === 0 && reason === "time") {
        message.reply(`${message.author} ⌛ TIMEOUT!! ⌛`)
      }
    })
  },
}

module.exports = stringCommand
