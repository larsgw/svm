const style = o =>
  Object.keys(o)
    .map(v => [v.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`), o[v]])
    .map(v => v.join(':'))
    .join(';')

module.exports = style
