const event = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    try {
      const stringCommand = client.stringCommands.get(message.content)
      if (!stringCommand) {
        await updateRandomXP(message.author)
      }
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
