const event = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    const stringCommand = client.stringCommands.get(message.content)
    if (!stringCommand) return

    try {
      await stringCommand.execute(message)
    } catch (error) {
      console.log(`[ERROR] - ${error}`)
      message.reply({
        content: "Internal server error!!",
        ephemeral: true,
      })
    }
  },
}

module.exports = event
