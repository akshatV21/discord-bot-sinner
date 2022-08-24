const getRandomlyPlacedOptions = optionsArray => {
  const randomIndexes = []
  const finalArray = []

  while (randomIndexes.length !== 4) {
    const randomIndex = Math.floor(Math.random() * optionsArray.length)
    if (randomIndexes.includes(randomIndex)) continue

    randomIndexes.push(randomIndex)
    finalArray.push(optionsArray[randomIndex])
  }

  return finalArray
}

module.exports = { getRandomlyPlacedOptions }
