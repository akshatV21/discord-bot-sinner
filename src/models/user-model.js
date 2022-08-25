const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  stats: {
    trivia: {
      played: {
        type: Number,
        default: 0,
      },
      gotCorrect: {
        type: Number,
        default: 0,
      },
      gotIncorrect: {
        type: Number,
        default: 0,
      },
      c_i_ratio: {
        type: Number,
        default: 0,
      },
      xpGained: {
        type: Number,
        default: 0,
      },
    },
  },
})

const UserModel = model("user", userSchema)

module.exports = UserModel
