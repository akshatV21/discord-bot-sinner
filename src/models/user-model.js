const { Schema, model, Types } = require("mongoose")

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
    randomXP: {
      type: Number,
      default: 0,
    },
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
    poke: {
      level: {
        type: Number,
        default: 0,
      },
      pokedex: {
        type: [Types.ObjectId],
        default: [],
      },
      pokecoins: {
        type: Number,
        default: 0,
      },
      xpGained: {
        type: Number,
        default: 0,
      },
      rareCandies: {
        type: Number,
        default: 0,
      },
    },
  },
})

const UserModel = model("user", userSchema)

module.exports = UserModel
