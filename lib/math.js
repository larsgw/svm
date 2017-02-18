const range = require('./range')

const quadratic = a => Math.pow(a * 1, 2)
const round = a => Math.round(a * 1e2) / 1e2

const binomium = (n, k) => {
  let coeff = 1
  
  for (let i = n - k + 1; i <= n; i++)
    coeff *= i
  for (let i = 1; i <= k; i++)
    coeff /= i
  
  return coeff
}

const bezier = (progress, points) => {
  const order = points.length
  
  let x = 0, y = 0
  
  range(order--).forEach(i => {
    const f =
      binomium(order, i) *
      Math.pow((1 - progress), (order - i)) *
      Math.pow(progress, i)
    
    x += f * points[i].x
    y += f * points[i].y
  })
  
  return {x, y}
}

module.exports = {
  pow2: quadratic,
  round2: round,
  binom: binomium,
  bezier: bezier
}
