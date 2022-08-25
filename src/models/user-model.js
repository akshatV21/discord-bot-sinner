const { Schema } = require("mongoose")

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
      played: Number,
      gotCorrect: Number,
      gotIncorrect: Number,
    },
  },
})
