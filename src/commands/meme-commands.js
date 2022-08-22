const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const axois = require("axios").default

const command = {
  data: new SlashCommandBuilder()
    .setName("memes")
    .setDescription("replies with memes from different subreddits!!")
    .addNumberOption(option => option.setName("count").setDescription("Number of memes you want!").setMaxValue(3)),
  async execute(interaction) {
    const api_url = process.env.MEME_API_URL
    const count = interaction.options.getNumber("count") || 1
    const subreddit = getSubredditName(interaction.channelId)

    const response = await axois.get(`${api_url}/${subreddit}/${count}`)
    const memesArray = await response.data.memes

    const memeEmbedsArray = []
    memesArray.forEach(meme => {
      const embed = new EmbedBuilder().setTitle(meme.title).setImage(meme.preview[2])
      memeEmbedsArray.push(embed)
    })

    interaction.guild.channels.cache.get(process.env.DANK_MEMES_CH_ID).send({ embeds: memeEmbedsArray })
  },
}

const getSubredditName = channelID => {
  const memeChannels = [
    {
      name: "dankmemes",
      id: process.env.DANK_MEMES_CH_ID,
    },
  ]
  const channel = memeChannels.find(channel => channel.id === channelID)
  return channel.name
}

module.exports = command
