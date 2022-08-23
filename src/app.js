require("dotenv").config()
const { readdirSync } = require("fs")
const { Client, GatewayIntentBits, Collection, CommandInteraction } = require("discord.js")

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

const sinner = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
})

sinner.login(DISCORD_BOT_TOKEN)

// commands
const commands = []
const COMMAND_FILES = readdirSync("./src/commands").filter(file => file.endsWith(".js"))

sinner.commands = new Collection()

COMMAND_FILES.forEach(file => {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
  sinner.commands.set(command.data.name, command)
})

// events
const EVENT_FILES = readdirSync("./src/events").filter(file => file.endsWith(".js"))

EVENT_FILES.forEach(file => {
  const event = require(`./events/${file}`)
  if (event.once) {
    sinner.on(event.name, (...args) => event.execute(...args, commands))
  } else {
    sinner.on(event.name, (...args) => event.execute(...args))
  }
})
