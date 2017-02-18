const parseName = (n = '') =>
  n
    .toString()
    .replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)

const cleanValue = (v = '') => v.toString().replace(/\s+/g, ' ')

const parseAttrs = function (attr = {}) {
  return Object.keys(attr)
    .map(k => `${parseName(k)}="${cleanValue(attr[k])}"`)
    .join(' ')
}

module.exports = parseAttrs
