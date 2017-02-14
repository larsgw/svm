const style = o =>
  Object.keys(o)
    .map(k => [k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`), o[k]])
    .map(([k, v]) => [k, Array.isArray(v) ? v.join(' ') : v])
    .filter(a => !!a[1])
    .map(a => a.join(':'))
    .join(';')

module.exports = style
