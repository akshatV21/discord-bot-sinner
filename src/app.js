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

// custom interaction
const int = {
  type: 2,
  id: "1011499880490991706",
  applicationId: "1010919639905218642",
  channelId: "1011188621124059218",
  guildId: "1010914960928419880",
  user: "755006188063555604",
  member: "755006188063555604",
  version: 1,
  appPermissions: "1097468472913",
  memberPermissions: "4398046511103",
  locale: "en-US",
  guildLocale: "en-US",
  commandId: "1011485676560207902",
  commandName: "memes",
  commandType: 1,
  commandGuildId: "1010914960928419880",
  deferred: false,
  replied: false,
  ephemeral: null,
  webhook: { id: "1010919639905218642" },
  options: {},
  manual: false,
}

setTimeout(() => {
  sinner.emit("interactionCreate", int)
}, 20000)
