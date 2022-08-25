const UserModel = require("../models/user-model")
const calculateXP = require("../helpers/xp-calc")

const saveUserTriviaStats = async options => {
  try {
    const { gotCorrect, timeTaken, user } = options

    const xp = gotCorrect ? calculateXP(timeTaken) : 0

    // fetching the user
    const member = await UserModel.findOne({ userID: user.id })
    if (!member) {
      // creating the user
      const newUser = new UserModel({
        userID: user.id,
        username: user.username,
        tag: user.discriminator,
      })

      // updating the user stats
      newUser.stats.trivia = updateStats(newUser, gotCorrect, xp)
      await newUser.save()
    } else {
      // updating the user stats
      member.stats.trivia = updateStats(member, gotCorrect, xp)
      await member.save()
      return { ...member.stats.trivia }
    }
  } catch (error) {
    throw new Error(error)
  }
}

const updateStats = (member, gotCorrect, xp) => {
  member.stats.trivia.played += 1
  member.stats.trivia.gotCorrect += gotCorrect ? 1 : 0
  member.stats.trivia.gotIncorrect += !gotCorrect ? 1 : 0
  member.stats.trivia.c_i_ratio = member.stats.trivia.gotCorrect / member.stats.trivia.gotIncorrect
  member.stats.trivia.xpGained += xp

  return member.stats.trivia
}

module.exports = { saveUserTriviaStats }
