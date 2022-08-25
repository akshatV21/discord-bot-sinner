const calculateXP = num => {
  if (num > 15 || num < 0) return

  const xpBasedOf = 15
  const difference = xpBasedOf - num

  const xp = Math.abs(difference * 1000)
  return xp
}

module.exports = calculateXP
