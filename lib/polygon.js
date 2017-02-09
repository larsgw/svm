const range = require('./range')

const f = global.opt.maxZoom
const q = a => Math.pow(a, 2)
const r = a => Math.round(a * 1e2) / 1e2
const s = a => a.join(' ')

const polygon = function (n, d, b) {
  if (n < 3) {
    throw new Error('n must be bigger than 2')
  }
  
  d = d * f
  d = d / Math.cos(Math.PI / n)
  
  const w = d * 2,
        i = 1 / f,
        tau = Math.PI * 2
  
  const c = range(n).map(i => {
    const a = (tau * (i + .5)) / n
    
    return [r(d + d * Math.sin(a)), r(d - d * Math.cos(a))]
  })
  
  const svg = `<svg
    style="transform:scale3d(${i},${i},${i});transform-origin:0 0;"
    width="${w}" height="${w}"
  >
    <path fill="${b}" d="
      M0 0 M${w} ${w}
      M${s(c.shift())} ${s(c.map(v => `L${s(v)}`))} Z
    ">
  </svg>`
  
  return svg
}

module.exports = polygon
