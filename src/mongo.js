const { default: mongoose } = require("mongoose")

const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URL)
  console.log("Connected to database!!")
}

module.exports = { connectToDatabase }
