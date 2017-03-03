const range = require('./range')

const quadratic = a => Math.pow(a * 1, 2)
const round = a => Math.round(a * 1e2) / 1e2

const pythagoras = (a, b) => Math.sqrt(quadratic(a) + quadratic(b))

const binomium = (n, k) => {
  let coeff = 1
  
  for (let i = n - k + 1; i <= n; i++)
    coeff *= i
  for (let i = 1; i <= k; i++)
    coeff /= i
  
  return coeff
}

const bezier = (progress, points) => {
  const order = points.length - 1
  
  let x = 0,
      y = 0
  
  range(order + 1).forEach(i => {
    const f =
      binomium(order, i) *
      Math.pow((1 - progress), (order - i)) *
      Math.pow(progress, i)
    
    x += f * points[i][0]
    y += f * points[i][1]
  })
  
  return [x, y]
}

const trigonometry = {}

trigonometry.const = trigonometry.c = {}

trigonometry.const.deg = 360

trigonometry.const.pi = Math.PI
trigonometry.const.tau = trigonometry.const.pi * 2
trigonometry.const.rad = trigonometry.const.tau

trigonometry.deg = rad => rad * trigonometry.const.deg / trigonometry.const.rad
trigonometry.rad = deg => deg * trigonometry.const.rad / trigonometry.const.deg

module.exports = {
  pow2: quadratic,
  round2: round,
  binom: binomium,
  bezier,
  trig: trigonometry,
  pyth: pythagoras
}