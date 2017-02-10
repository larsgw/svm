const quadratic = a => Math.pow(a * 1, 2)
const round = a => Math.round(a * 1e2) / 1e2

module.exports = {q: quadratic, r: round}
